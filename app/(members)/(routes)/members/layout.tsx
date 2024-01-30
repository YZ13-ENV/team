import Nav from "@/app/_components/nav"
import Notifications from "@/components/shared/notifications"
import TeamContainer from "@/components/shared/team-container"
import User from "@/components/shared/user-circle"
import { getVisitorId } from "@/helpers/cookies"
import { team, user } from "api"
import { ProjectsGrid } from "ui"

type Props = {
  children: JSX.Element
}
const layout = async({ children }: Props) => {
  const visitorId = getVisitorId()
  const short = visitorId ? await user.byId.short(visitorId) : null
  const teamId = short ? short.teamId : null
  const teamInfo = teamId ? await team.get(teamId) : null
  return (
    <main className="w-full h-screen flex flex-col justify-between overflow-y-hidden">
      <div className="w-full h-fit p-12">
        <h1 className="text-center">{teamInfo ? teamInfo.name : "Команда"}</h1>
      </div>
      <TeamContainer noTeam={!(!!teamId)}>
        <div className="w-full h-fit flex items-center justify-between">
          <div className="w-fit h-fit flex items-center gap-2"><Nav /></div>
          <div className="w-fit h-fit flex items-center gap-2">
            <Notifications />
            <ProjectsGrid />
            <User />
          </div>
        </div>
        { children }
      </TeamContainer>
    </main>
  )
}
export default layout