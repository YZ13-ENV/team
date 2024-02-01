'use client'
import { Input } from "@/components/ui/input"
import SettingsBlock from "../settings-block"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { team } from "api"
import { useDebounceEffect } from "ahooks"

type Props = {
  teamId?: string
  defaultValue?: string
}
const TeamName = ({ defaultValue='', teamId }: Props) => {
  const [value, setValue] = useState<string>(defaultValue)
  const [loading, setLoading] = useState<boolean>(false)
  const disabled = loading || !teamId
  const { refresh } = useRouter()
  const updateName = async() => {
    if (teamId) {
      setLoading(true)
      await team.update(teamId, { name: value })
      setLoading(false)
      toast('Название команды успешно изменено!')
      refresh()
    }
  }
  useDebounceEffect(() => {
    if (value !== defaultValue) updateName()
  },[value, setValue])
  return (
    <SettingsBlock
      title="Название команды"
      description="Под каким название пользователи будут узнавать вашу команду"
    >
      <Input value={value} onChange={e => setValue(e.target.value)}
      placeholder="Введите название команды" disabled={disabled} />
    </SettingsBlock>
  )
}

export default TeamName