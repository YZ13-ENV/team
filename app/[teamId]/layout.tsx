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
    <main className="w-full h-screen flex flex-col justify-between overflow-y-hidden">
      <div className="w-full px-6 py-2">
        <Header teamId={teamId} teamName={team?.name} />
      </div>
      <TeamContainer noTeam={!(!!teamId)}>
        { children }
      </TeamContainer>
    </main>
  )
}

export default layout