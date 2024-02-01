import SendedInvites from "../../_components/sended-invites"
import { getTeam } from "@/helpers/getTeam"
import InviteSearch from "../../_components/invite-search"

type Props = {
  params: {
    teamId: string
  }
}
const page = async({ params }: Props) => {
  const { teamId: providedTeamId } = params
  const { team, teamId, user } = await getTeam(providedTeamId)
  const members = team ? [ ...team.members, team.founder ] : []
  if (!teamId) return null
  return (
    <div style={{ height: 'calc(100vh - ((48px * 2) + 49px))' }} className="w-full flex items-start gap-4">
      <SendedInvites teamId={teamId} />
      <InviteSearch teamId={teamId} members={members} />
    </div>
  )
}

export default page