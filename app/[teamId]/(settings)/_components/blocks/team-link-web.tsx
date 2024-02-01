'use client'
import { Input } from "@/components/ui/input"
import SettingsBlock from "../settings-block"
import { team, type Team } from "api"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useDebounceEffect } from "ahooks"

type Props = {
  teamId?: string
  links: Team['links']
}
const TeamLinkWeb = ({ links, teamId }: Props) => {
  const [webLink, setWebLink] = useState<string>(links?.web || '')
  const [loading, setLoading] = useState<boolean>(false)
  const { refresh } = useRouter()
  const disabled = !teamId || loading
  const update = async() => {
    if (teamId) {
      setLoading(true)
      await team.update(
        teamId, links ? { links: { ...links, web: webLink } } : { links: { web: webLink } }
      )
      setLoading(false)
      toast('Ссылка успешно обновлена!')
      refresh()
    }
  }
  useDebounceEffect(() => {
    if (webLink !== links?.web) update()
  },[webLink, setWebLink])
  return (
    <SettingsBlock noSeparator
      title="Ссылка"
      description="Укажите ссылку на страницу команды"
    >
      <Input value={webLink} onChange={e => setWebLink(e.target.value)}
      disabled={disabled} placeholder="Введите ссылку" />
    </SettingsBlock>
  )
}

export default TeamLinkWeb