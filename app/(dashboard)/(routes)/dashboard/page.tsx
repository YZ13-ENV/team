import Notifications from "@/components/shared/notifications"
import TeamContainer from "@/components/shared/team-container"
import { getVisitorId } from "@/helpers/cookies"
import { team, user } from "api"
import { ProjectsGrid } from "ui"
import User from "@/components/shared/user-circle"
import Nav from "@/app/_components/nav"

export default async function Home() {
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
        <div style={{ height: 'calc(100% - 36px)' }} className="w-full pt-4 grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 grid-rows-4 gap-4">
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>

          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>

          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>

          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
          <div className="w-full h-full bg-muted"></div>
        </div>
      </TeamContainer>
    </main>
  )
}
