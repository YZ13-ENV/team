'use client'
import SettingsBlock from "../settings-block"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { team } from "api"
import { useDebounceEffect } from "ahooks"
import { Textarea } from "ui"

type Props = {
  teamId?: string
  defaultValue?: string
}
const TeamDescription = ({ defaultValue='', teamId }: Props) => {
  const [value, setValue] = useState<string>(defaultValue)
  const [loading, setLoading] = useState<boolean>(false)
  const disabled = loading || !teamId
  const { refresh } = useRouter()
  const updateDescription = async() => {
    if (teamId) {
      setLoading(true)
      await team.update(teamId, { about: value })
      setLoading(false)
      toast('Описание команды успешно изменено!')
      refresh()
    }
  }
  useDebounceEffect(() => {
    if (value !== defaultValue) updateDescription()
  },[value, setValue])
  return (
    <SettingsBlock noSeparator
      title="Описание команды"
      description="Расскажите о команде, её целях."
    >
      <Textarea value={value} onChange={e => setValue(e.target.value)}
      className='px-3 py-2 rounded-md border text-sm disabled:cursor-not-allowed disabled:opacity-50'
      placeholder="Введите описание команды" disabled={disabled} />
    </SettingsBlock>
  )
}

export default TeamDescription