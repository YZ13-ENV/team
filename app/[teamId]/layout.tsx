import TeamContainer from "@/components/shared/team-container"
import Header from "@/components/widgets/header"
import { getTeam } from "@/helpers/getTeam"

type Props = {
  params: {
    teamId: string
  }
  children: JSX.Element
}
const layout = async({ children, params }: Props) => {
  const { teamId: providedTeamId } = params
  const { team, teamId, user } = await getTeam(providedTeamId)
  return (
    <>
      <Header teamId={teamId} teamName={team?.name} />
      <TeamContainer noTeam={!(!!teamId)}>
        { children }
      </TeamContainer>
    </>
  )
}

export default layout