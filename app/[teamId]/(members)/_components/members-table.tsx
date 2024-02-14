import MemberRow from "./member-row"
import { NavLayout } from "@/components/widgets/header/default-header"
import MemberCheckbox from "./member-checkbox"

type Props = {
  teamId: string
  members: string[]
  founderId: string
  nav: NavLayout
}
const MembersTable = ({ founderId, members, teamId, nav }: Props) => {
  const showCheckbox = nav === 'founder'
  const shotActions = nav === 'founder'
  return (
    <table className="w-full h-fit max-h-full">
      <thead>
        <tr className="text-muted-foreground h-12 border-b">
          {
            showCheckbox
            ? <td className="w-6 px-1"><MemberCheckbox isRoot members={members} /></td>
            : <td className="w-6 px-1"><span className="text-muted-foreground text-sm">#</span></td>
          }
          <td className="px-3">Имя</td>
          <td className="px-3">Никнейм</td>
          <td className="px-3">Позиция</td>
          <td className="px-3">Почта</td>
          { shotActions && <td className="w-9"></td> }
        </tr>
      </thead>
      <tbody>
        {
          members.map(
            (member, index) => <MemberRow key={member} founderId={founderId} teamId={teamId} members={members} nav={nav} member={member} index={index} />
          )
        }
      </tbody>
    </table>
  )
}

export default MembersTable