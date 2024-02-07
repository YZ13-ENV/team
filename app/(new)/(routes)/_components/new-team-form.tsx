'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { auth } from '@/utils/app'
import { useDebounceEffect } from 'ahooks'
import { team } from 'api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Textarea } from 'ui'

type Props = {
  alreadyCreateTeam?: boolean
}
const NewTeamForm = ({ alreadyCreateTeam=false }: Props) => {
  const [user] = useAuthState(auth)
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [isBusy, setIsBusy] = useState<boolean>(true)
  const disabled = alreadyCreateTeam || loading || !user
  const createDisabled = disabled || !name || isBusy
  const regEx = /[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/g
  const nameIdRegExp = /[^a-zA-Z 0-9 -]+/g
  const { push } = useRouter()
  const teamId = name
      .toLowerCase()
      .replace(nameIdRegExp,'')
      .replaceAll(' ', '-')
      .replaceAll('--', '-')

  const isTeamIdValid = regEx.test(name)
  const checkIsBusy = async() => {
    if (teamId) setIsBusy(!!(await team.get(teamId)))
  }
  const createTeam = async() => {
    if (user) {
      setLoading(true)
      const newTeam = await team.create(teamId, {
        name: name,
        bio: bio,
        founder: user.uid,
        members: []
      })
      if (newTeam) {
        push(`/${newTeam.doc_id}`)
      }
      setLoading(false)
    }
  }
  useDebounceEffect(() => {
    if (name.length >= 3 && teamId && isTeamIdValid) checkIsBusy()
  },[name])
  return (
    <>
      <div className="max-w-7xl w-full mx-auto flex flex-col py-12 px-6 gap-6">
        <div className="w-full h-fit flex flex-col gap-2">
          { !!teamId && <span className='text-xs text-muted-foreground'>ID вашей команды - { teamId }</span> }
          <Input disabled={disabled} value={name} onChange={e => setName(e.target.value)}
          placeholder="Как пользователи будут узнавать о вашей команде" />
          <span className='text-xs text-muted-foreground'>
            Учтите что при создании команды её название будет использоваться как ID команды, после создания команды ID поменять не получится, только название.
          </span>
        </div>
        <div className="w-full h-fit flex flex-col gap-2">
          <Textarea disabled={disabled} value={bio} onChange={e => setBio(e.target.value)}
          className="p-3 rounded-md border text-sm disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground"
          placeholder="Расскажите немного о команде..." />
        </div>
      </div>
      <div className="max-w-7xl w-full mx-auto flex items-end mt-auto flex-col py-12 px-6 gap-6">
        <Button disabled={createDisabled} onClick={createTeam} className="w-fit">Создать команду</Button>
      </div>
    </>
  )
}

export default NewTeamForm