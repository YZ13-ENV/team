import { DocTeam, ShortUserData, team, user } from "api"
import { getVisitorId } from "./cookies"

type TeamPageConfig = {
  user: ShortUserData | null
  teamId: string | undefined
  team: DocTeam | null
}
export const getTeam = async(providedTeamId?: string): Promise<TeamPageConfig> => {
  const visitorId = getVisitorId()
  if (providedTeamId) {
    const teamInfo = providedTeamId ? await team.get(providedTeamId) : null
    const short = visitorId ? await user.byId.short(visitorId) : null
    const teamId = short ? short.teamId : undefined
    return {
      user: short,
      teamId: providedTeamId || teamId,
      team: teamInfo
    }
  } else {
    const short = visitorId ? await user.byId.short(visitorId) : null
    const teamId = short ? short.teamId : undefined
    const teamInfo = teamId ? await team.get(teamId) : null
    return {
      user: short,
      teamId: teamId,
      team: teamInfo
    }
  }
}