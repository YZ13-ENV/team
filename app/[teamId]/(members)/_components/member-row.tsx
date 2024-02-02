import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { NavLayout } from "@/components/widgets/header"
import { user } from "api"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { Avatar } from "ui"

type Props = {
  member: string
  nav?: NavLayout
}
const MemberRow = async({ member, nav }: Props) => {
  const data = await user.byId.short(member)
  const showCheckbox = nav === 'founder'
  const shotActions = nav === 'founder'
  if (!data) return null
  return (
    <tr className="h-12 border-b">
      { showCheckbox && <td className="w-6 px-1"><Checkbox /></td> }
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
      { shotActions && <td><Button variant='outline' size='icon'><BiDotsVerticalRounded /></Button></td> }
    </tr>
  )
}

export default MemberRow