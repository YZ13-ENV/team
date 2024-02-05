import { Button } from "@/components/ui/button"
import { BiGroup } from "react-icons/bi"
import { getTeam } from "@/helpers/getTeam"
import MembersTable from "../../_components/members-table"
import { HiOutlineUserAdd } from "react-icons/hi"
import { BiFilterAlt } from "react-icons/bi";
import { MdSort } from "react-icons/md";
import Link from "next/link"

type Props = {
  params: {
    teamId: string
  }
}
const page = async({ params }: Props) => {
  const { teamId: providedTeamId } = params
  const { team, nav } = await getTeam(providedTeamId)
  const members = team ? [ ...team.members, team.founder ] : []
  const isFounder = nav === 'founder'
  if (!team) return null
  return (
    <div style={{ height: 'calc(100% - 36px)' }} className="w-full py-4">
      <div className="w-full h-fit pb-4 flex items-center gap-4">
        <div className='flex items-center gap-2'>
          <BiGroup size={20} />
          <span className="text-lg font-medium">Участники({members.length})</span>
        </div>
        <div className='flex items-center gap-2'>
          <Button disabled size='sm' variant='outline' className="gap-2"><MdSort /> Сортировка</Button>
          <Button disabled size='sm' variant='outline' className="gap-2"><BiFilterAlt /> Фильтр</Button>
        </div>
        <div className='flex items-center gap-2 ml-auto'>
          {
            isFounder &&
            <Button size='sm' variant='default' className="gap-2" asChild>
              <Link href={`/${providedTeamId}/invite`}>
                <HiOutlineUserAdd />
                Пригласить
              </Link>
            </Button>
          }
        </div>
      </div>
      <MembersTable teamId={providedTeamId} founderId={team.founder} nav={nav} members={members} />
    </div>
  )
}

export default page