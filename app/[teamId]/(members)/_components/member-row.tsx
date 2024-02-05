import { NavLayout } from "@/components/widgets/header"
import { user } from "api"
import { Avatar } from "ui"
import MemberDropdown from "./member-dropdown"
import MemberCheckbox from "./member-checkbox"

type Props = {
  founderId: string
  teamId: string
  members: string[]
  member: string
  index: number
  nav?: NavLayout
}
const MemberRow = async({ member, founderId, members, teamId, nav, index }: Props) => {
  const data = await user.byId.short(member)
  const showCheckbox = nav === 'founder'
  const shotActions = nav === 'founder'
  const isFounder = founderId === member
  if (!data) return null
  return (
    <tr className="h-12 border-b hover:bg-card transition-colors cursor-pointer">
      {
        showCheckbox
        ? <td className="w-6 px-1"><MemberCheckbox id={member} /></td>
        : <td className="w-6 px-1"><span className="text-sm text-muted-foreground">{++index}</span></td>
      }
      <td className="border-r px-3">
        <div className="w-fit h-fit flex flex-row items-center gap-2">
            {
              data.photoUrl
              ? <Avatar src={data.photoUrl} size={28} />
              : <div className='w-7 h-7 rounded-full bg-muted'/>
            }
            <span className="font-medium">{ data.displayName }</span>
        </div>
      </td>
      <td className="px-3 text-sm">
        {
          data.nickname
          ? <span className="px-2 py-1 rounded-md bg-primary text-primary-foreground text-sm">@{data.nickname}</span>
          : 'Не указан'
        }
      </td>
      <td className="border-x px-3 text-sm">{ data.position ? <span className="px-2 py-1 rounded-md bg-muted text-sm">{data.position}</span> : 'Не указана' }</td>
      <td className="px-3 text-sm"><span className="">{data.email}</span> </td>
      { shotActions && <td><MemberDropdown disabled={isFounder} memberId={member} members={members} teamId={teamId} /></td> }
    </tr>
  )
}

export default MemberRow