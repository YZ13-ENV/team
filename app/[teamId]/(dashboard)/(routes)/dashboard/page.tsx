import { getTeam } from "@/helpers/getTeam"
import { redirect } from "next/navigation"
import { team as teamAPI } from 'api'
import { BiChevronDown } from "react-icons/bi"
// import { Checkbox } from "@/components/ui/checkbox"
// import { BiMessageRounded, BiPin } from "react-icons/bi"

type Props = {
  params: {
    teamId: string
  }
}
export default async function Home({ params }: Props) {
  const { teamId: providedTeamId } = params
  const { team, teamId, nav, user } = await getTeam(providedTeamId)
  const config = await teamAPI.task.config.get(providedTeamId)
  // teamAPI.
  if (nav === 'visitor') return redirect(`/${providedTeamId}`)
  return (
    <div style={{ minHeight: 'calc(100dvh - 49px - 48px - 48px)' }} className="w-full px-6 py-12 flex flex-col max-w-7xl mx-auto gap-2">
      <span className="text-4xl font-bold">С возвращением, {user?.displayName} </span>
      <span className="text-muted-foreground">У вас пока что нет задач.</span>
      <div className="space-y-3 my-6">
        {
          config &&
          config?.statuses
            .map(status => <div key={status} className="w-full bg-card rounded-xl border p-4">
              <div className="w-full h-fit flex items-center gap-2">
                <BiChevronDown size={18} />
                <span className="text-xl font-bold capitalize">{status}</span>
              </div>
            </div>)
        }
      </div>
      {/* <div className="w-full h-full flex flex-col my-4">
        <div className="w-full h-fit rounded-lg border p-4 flex items-start gap-4">
          <div className="">
            <Checkbox />
          </div>
          <div className="w-full h-fit flex flex-col">
            <span className="font-medium">Сама задача</span>
            <span className="text-muted-foreground">Описание задачи</span>
            <div className="w-full h-fit flex items-center justify-between">
              <div className="flex items-center gap-2 mt-4">
                <span className="px-2 py-1 rounded-md text-xs text-muted-foreground border">Тэг</span>
              </div>
              <div className="flex items-center gap-2">
                <BiPin size={18} className="text-muted-foreground" />
                <BiMessageRounded size={18} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}
