'use client'

import { Input } from "@/components/ui/input"
import SettingsBlock from "../settings-block"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { team } from "api"
import { toast } from "sonner"
import { useDebounceEffect } from "ahooks"

type Props = {
  teamId?: string
  defaultValue?: string
}
const TeamSignature = ({ defaultValue='', teamId }: Props) => {
  const [value, setValue] = useState<string>(defaultValue)
  const [loading, setLoading] = useState<boolean>(false)
  const disabled = loading || !teamId
  const { refresh } = useRouter()
  const updateName = async() => {
    if (teamId) {
      setLoading(true)
      await team.update(teamId, { signature: value })
      setLoading(false)
      toast('Краткая информация успешно изменена!')
      refresh()
    }
  }
  useDebounceEffect(() => {
    if (value !== defaultValue) updateName()
  },[value, setValue])
  return (
    <SettingsBlock
      title="Краткая информация"
      description="Будет указываться большим текстом в профиле команды"
    >
      <Input value={value} onChange={e => setValue(e.target.value)} disabled={disabled}
      placeholder="Введите краткую информацию" />
    </SettingsBlock>
  )
}

export default TeamSignature