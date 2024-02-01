import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { BiRightArrowAlt } from "react-icons/bi"
import SettingsBlock from "../../_components/settings-block"
import TeamName from "../../_components/blocks/team-name"
import { getTeam } from "@/helpers/getTeam"
import TeamSignature from "../../_components/blocks/team-signature"
import TeamDescription from "../../_components/blocks/team-description"
import AvatarBlock from "../../_components/blocks/team-avatar"

type Props = {
  params: {
    teamId: string
  }
}
const page = async({ params }: Props) => {
  const { teamId: providedTeamId } = params
  const { team, teamId, user } = await getTeam(providedTeamId)
  return (
    <div className="flex flex-col w-full max-h-full">
      <div className="max-w-7xl mx-auto w-full pb-12 pt-6">
        <span className="text-4xl font-bold">Настройки</span>
      </div>
      <Separator />
      <div className="max-w-7xl mx-auto w-full">

        <AvatarBlock teamId={teamId} avatarURL={team?.photoURL} />

        <TeamName teamId={teamId} defaultValue={team?.name} />

        <TeamSignature teamId={teamId} defaultValue={team?.signature} />

        <TeamDescription teamId={teamId} defaultValue={team?.about} />

      </div>
      <Separator />
      <div className="max-w-7xl mx-auto w-full py-12">
        <span className="text-4xl font-bold">Ссылки</span>
      </div>
      <Separator />
      <div className="max-w-7xl mx-auto w-full">

        <SettingsBlock noSeparator
          title="Ссылка"
          description="Укажите ссылку на страницу команды"
        >
          <Input placeholder="Введите ссылку" />
        </SettingsBlock>

      </div>
      <Separator />
      <div className="max-w-7xl mx-auto w-full py-12">
        <span className="text-4xl font-bold">Участники</span>
      </div>
      <Separator />
      <div className="max-w-7xl mx-auto w-full">

        <SettingsBlock noSeparator
          title="Управление составом команды"
          description="Пригласить новых, исключить старых"
        >
          <Button className="w-fit gap-2" variant='default'>Перейти к управлению <BiRightArrowAlt /></Button>
        </SettingsBlock>

      </div>
      <Separator />

      <div className="max-w-7xl mx-auto w-full py-12">
        <span className="text-4xl font-bold">Опасная зона</span>
      </div>
      <Separator />
      <div className="max-w-7xl mx-auto w-full">

        <SettingsBlock noSeparator
          title="Удалить команду"
          description="Удалится и весь контент, созданный командой"
        >
          <Button className="w-fit" variant='destructive'>Удалить команду</Button>
        </SettingsBlock>

      </div>
    </div>
  )
}

export default page