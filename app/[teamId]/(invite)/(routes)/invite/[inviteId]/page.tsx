import { Button } from "@/components/ui/button"
import MembersGroup from "@/components/widgets/members-group"
import { getTeam } from "@/helpers/getTeam"
import Image from "next/image"
import { HiOutlineUserGroup } from "react-icons/hi"

type Props = {
  params: {
    teamId: string
    inviteId: string
  }
}
const page = async({ params }: Props) => {
  const { inviteId, teamId: providedTeamId } = params
  const { team, teamId, user } = await getTeam(providedTeamId)
  const members = team ? [...team.members, team.founder] : []
  return (
    <div style={{ height: 'calc(100dvh - (48px*2) - 49px)' }} className="w-full h-fit flex flex-col items-center justify-center gap-12">
      <div className="max-w-md w-full flex flex-col gap-6">
        <div className="w-full h-fit flex items-center justify-center flex-col gap-3">
          {
            team && team.photoURL
            ? <Image src={team.photoURL} width={96} height={96} alt="team-photo" />
            : <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center"><HiOutlineUserGroup size={48} /></div>
          }
          <span className="text-sm text-center text-accent-foreground">Вас приглашают в команду</span>
          <span className="text-center text-3xl font-semibold">{team?.name}</span>
          <span className="text-sm text-center text-muted-foreground">Участников - {members.length}</span>
        </div>
        <div className="w-full h-fit flex items-center justify-center gap-3">
          <MembersGroup hideNames members={members}  size={48} />
        </div>
      </div>
      <div className="w-full h-fit flex items-center justify-center gap-3 max-w-md">
        <Button disabled className="w-1/2" variant='outline'>Отклонить</Button>
        <Button disabled className="w-1/2" variant='default'>Принять</Button>
      </div>
    </div>
  )
}

export default page