import { getVisitorId } from "@/helpers/cookies"
import { team, user } from "api"
import MemberRow from "../../_components/member-row"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { BiGroup } from "react-icons/bi"

const page = async() => {
  const visitorId = getVisitorId()
  const short = visitorId ? await user.byId.short(visitorId) : null
  const teamId = short ? short.teamId : null
  const teamInfo = teamId ? await team.get(teamId) : null
  const members = teamInfo ? [ ...teamInfo.members, teamInfo.founder ] : []
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
      <table className="w-full h-fit max-h-full">
        <thead>
          <tr className="text-muted-foreground h-12 border-b">
            <td className="w-6 px-1"><Checkbox /></td>
            <td className="px-3">Имя</td>
            <td className="px-3">Никнейм</td>
            <td className="px-3">Позиция</td>
            <td className="px-3">Почта</td>
            <td className="w-9"></td>
          </tr>
        </thead>
        <tbody>
          {
            members.map(member => <MemberRow key={member} member={member} /> )
          }
        </tbody>
      </table>
    </div>
  )
}

export default page