import { getVisitorId } from "@/helpers/cookies"
import { team, user } from "api"

export default async function Home() {
  const visitorId = getVisitorId()
  const short = visitorId ? await user.byId.short(visitorId) : null
  const teamId = short ? short.teamId : null
  const teamInfo = teamId ? await team.get(teamId) : null
  return (
    <div style={{ height: 'calc(100% - 36px)' }} className="w-full pt-4 max-w-7xl mx-auto flex flex-col max-h-full gap-4">
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
        <div className="w-1/3 grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-2 grid-rows-4 gap-2">
          <div className="w-full h-full flex flex-col justify-center">
            <span className="text-xs text-muted-foreground">Сайт</span>
            <span className="text-sm line-clamp-1 text-accent-foreground">https://darkmaterial.space</span>
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex flex-col gap-4 mt-auto">
        <span className="font-medium">Последние работы</span>
        <div className="w-full h-fit grid lg:grid-cols-4 grid-cols-2 lg:grid-rows-1 grid-rows-2 gap-4">
          <div className="w-full h-full aspect-[4/3] rounded-lg bg-muted"></div>
          <div className="w-full h-full aspect-[4/3] rounded-lg bg-muted"></div>
          <div className="w-full h-full aspect-[4/3] rounded-lg bg-muted"></div>
          <div className="w-full h-full aspect-[4/3] rounded-lg bg-muted"></div>
        </div>
      </div>
    </div>
  )
}
