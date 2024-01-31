import { getVisitorId } from "@/helpers/cookies"
import { team, user } from "api"

export default async function Home() {
  const visitorId = getVisitorId()
  const short = visitorId ? await user.byId.short(visitorId) : null
  const teamId = short ? short.teamId : null
  const teamInfo = teamId ? await team.get(teamId) : null
  return (
    <div style={{ height: 'calc(100% - 36px)' }} className="w-full pt-4 grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 grid-rows-4 gap-4 max-w-7xl mx-auto">
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
  )
}
