'use client'
import Member from "@/components/shared/member/loaded"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDebounceEffect } from "ahooks"
import { ShortUserData, team, user as userAPI } from "api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BiLoaderAlt } from "react-icons/bi"

type Props = {
  members?: string[]
  teamId: string
}
const InviteSearch = ({ teamId, members }: Props) => {
  const [text, setText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [target, setTarget] = useState<ShortUserData | null>(null)
  const disabled = loading
  const inviteDisabled = members && target ? members.includes(target.uid) : false
  const { refresh } = useRouter()
  const sendInvite = async() => {
    if (target) {
      setLoading(true)
      await team.invite.invite(teamId, target.uid)
      setLoading(false)
      refresh()
    }
  }
  useDebounceEffect(() => {
    if (text) {
      setLoading(true)
      userAPI.byNick.short(text, false)
      .then(short => setTarget(short as ShortUserData | null))
      .finally(() => setLoading(false))
    }
  },[text, setText], { wait: 1000 })
  return (
    <div className="w-full pt-3">
      <div className="flex items-center w-full max-w-3xl gap-4 mx-auto h-fit">
        <Input placeholder="Введите ник пользователя..." disabled={disabled}
        value={text} onChange={e => setText(e.target.value)} />
      </div>
      <div className="flex flex-col w-full h-full max-w-3xl py-6 mx-auto">
        {
          target
          ? <div className="flex items-center justify-between w-full h-9">
            <Member member={target} size={32} />
            <Button onClick={sendInvite} disabled={inviteDisabled} className="gap-2">
              { loading && <BiLoaderAlt className="animate-spin" /> }
              Пригласить
            </Button>
          </div>
          : null
        }
      </div>
    </div>
  )
}

export default InviteSearch