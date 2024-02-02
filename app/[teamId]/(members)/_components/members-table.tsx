import { Checkbox } from "@/components/ui/checkbox"
import MemberRow from "./member-row"
import { NavLayout } from "@/components/widgets/header"

type Props = {
  members: string[]
  nav: NavLayout
}
const MembersTable = ({ members, nav }: Props) => {
  const showCheckbox = nav === 'founder'
  const shotActions = nav === 'founder'
  return (
    <table className="w-full h-fit max-h-full">
      <thead>
        <tr className="text-muted-foreground h-12 border-b">
          {
            showCheckbox
            ? <td className="w-6 px-1"><Checkbox /></td>
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
            (member, index) => <MemberRow key={member} nav={nav} member={member} index={index} />
          )
        }
      </tbody>
    </table>
  )
}

export default MembersTable