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
  const { team, teamId, nav } = await getTeam(providedTeamId)
  return (
    <>
      <Header nav={nav} teamId={teamId} teamName={team?.name} />
      <TeamContainer>
        { children }
      </TeamContainer>
    </>
  )
}

export default layout