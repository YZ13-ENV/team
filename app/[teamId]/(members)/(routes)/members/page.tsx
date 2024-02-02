import MemberRow from "../../_components/member-row"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { BiGroup } from "react-icons/bi"
import { getTeam } from "@/helpers/getTeam"
import MembersTable from "../../_components/members-table"

type Props = {
  params: {
    teamId: string
  }
}
const page = async({ params }: Props) => {
  const { teamId: providedTeamId } = params
  const { team, nav } = await getTeam(providedTeamId)
  const members = team ? [ ...team.members, team.founder ] : []
  return (
    <div style={{ height: 'calc(100% - 36px)' }} className="w-full py-4">
      <div className="w-full h-fit pb-4 flex items-center gap-4">
        <div className='flex items-center gap-2'>
          <BiGroup size={20} />
          <span className="text-lg font-medium">Участники({members.length})</span>
        </div>
        <div className='flex items-center gap-2'>
          <Button size='sm' variant='outline'>Сортировка</Button>
          <Button size='sm' variant='outline'>Фильтр</Button>
        </div>
        <div className='flex items-center gap-2 ml-auto'>
          <Button size='sm' variant='default'>Пригласить</Button>
        </div>
      </div>
      <MembersTable nav={nav} members={members} />
    </div>
  )
}

export default page