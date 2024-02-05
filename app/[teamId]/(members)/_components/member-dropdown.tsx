'use client'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { team } from "api"
import { useRouter } from "next/navigation"
import { BiDotsVerticalRounded, BiUserMinus } from 'react-icons/bi'

type Props = {
  teamId: string
  memberId: string
  members: string[]
  disabled?: boolean
}
const MemberDropdown = ({ disabled=false, memberId, members, teamId }: Props) => {
  const { refresh } = useRouter()
  const deleteUser = async() => {
    await team.update(teamId, { members: members.filter(member => member !== memberId) })
    refresh()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button variant='outline' size='icon'><BiDotsVerticalRounded /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={deleteUser} className="gap-2">
          <BiUserMinus /> Исключить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MemberDropdown