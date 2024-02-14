import { DocTeam, ShortUserData, team, user } from "api"
import { getVisitorId } from "./cookies"
import { NavLayout } from "@/components/widgets/header/default-header"

type TeamPageConfig = {
  user: ShortUserData | null
  teamId: string | undefined
  team: DocTeam | null
  nav: NavLayout
}
export const getTeam = async(providedTeamId?: string): Promise<TeamPageConfig> => {
  const visitorId = getVisitorId()
  if (providedTeamId) {
    const teamInfo = providedTeamId ? await team.get(providedTeamId) : null
    const short = visitorId ? await user.byId.short(visitorId) : null
    const teamId = short ? short.teamId : undefined
    if (teamInfo && visitorId) {
      const isMember = team && user ? teamInfo.members.includes(visitorId) : false
      const isFounder = team && user ? teamInfo.founder === visitorId : false
      const isVisitor = !user || !isMember && !isFounder
      const nav: NavLayout = isVisitor ? 'visitor' : isMember ? 'member' : isFounder ? 'founder' : 'visitor'
      return {
        user: short,
        teamId: providedTeamId || teamId,
        team: teamInfo,
        nav: nav
      }
    } else return {
      user: short,
      teamId: providedTeamId || teamId,
      team: teamInfo,
      nav: 'visitor'
    }
  } else {
    const short = visitorId ? await user.byId.short(visitorId) : null
    const teamId = short ? short.teamId : undefined
    const teamInfo = teamId ? await team.get(teamId) : null
    if (teamInfo && visitorId) {
      const isMember = team && user ? teamInfo.members.includes(visitorId) : false
      const isFounder = team && user ? teamInfo.founder === visitorId : false
      const isVisitor = !user || !isMember && !isFounder
      const nav: NavLayout = isVisitor ? 'visitor' : isMember ? 'member' : isFounder ? 'founder' : 'visitor'
      return {
        user: short,
        teamId: teamId,
        team: teamInfo,
        nav: nav
      }
    } else return {
      user: short,
      teamId: teamId,
      team: teamInfo,
      nav: 'visitor'
    }
  }
}