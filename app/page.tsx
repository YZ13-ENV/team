import Notifications from "@/components/shared/notifications"
import TeamContainer from "@/components/shared/team-container"
import { getVisitorId } from "@/helpers/cookies"
import { team, user } from "api"
import Nav from "./_components/nav"
import { ProjectsGrid } from "ui"
import User from "@/components/shared/user-circle"
import { Button } from "@/components/ui/button"

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
        <div style={{ height: 'calc(100% - 36px)' }} className="w-full pt-4 flex flex-col gap-4">
          <div className="w-fit h-fit flex flex-col gap-2 py-12">
            <div className="w-fit h-fit flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-muted"></div>
              <div className="w-fit h-fit flex flex-col justify-center">
                <h1 className="text-4xl font-bold">{teamInfo?.name}</h1>
                <span className="text-base text-muted-foreground">Команда</span>
              </div>
            </div>
            { teamInfo?.signature && <span className="xl:text-5xl text-4xl font-bold text-accent-foreground">{ teamInfo?.signature}</span> }
          </div>
          {/* <div className="w-fit h-fit flex items-center gap-4">
            <Button variant='outline'>И ещё что-то</Button>
            <Button variant='default'>Что-то</Button>
          </div> */}
          <div className="w-full h-fit flex flex-row items-start gap-4">
            <div className="w-2/3 flex flex-col gap-2">
              <span className='text-lg font-medium'>О команде</span>
              <span className="text-muted-foreground text-sm">Что-то о команде</span>
            </div>
            <div className="w-1/3 grid grid-cols-2 grid-rows-2 gap-2">
              <div className="w-full h-full flex flex-col justify-center">
                <span className="text-xs text-muted-foreground">Сайт</span>
                <span className="text-sm text-accent-foreground">https://darkmaterial.space</span>
              </div>
            </div>
          </div>
          <div className="w-full h-fit flex flex-col gap-4 mt-auto">
            <span className="font-medium">Последние работы</span>
            <div className="w-full h-64 grid grid-cols-4 grid-rows-1 gap-4">
              <div className="w-full h-full rounded-lg bg-muted"></div>
              <div className="w-full h-full rounded-lg bg-muted"></div>
              <div className="w-full h-full rounded-lg bg-muted"></div>
              <div className="w-full h-full rounded-lg bg-muted"></div>
            </div>
          </div>
        </div>
      </TeamContainer>
    </main>
  )
}
