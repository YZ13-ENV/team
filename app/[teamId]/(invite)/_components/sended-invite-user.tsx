'use client'

import Member from "@/components/shared/member/server"
import { Button } from "@/components/ui/button"
import { DocTeamInvite, team } from "api"
import { useRouter } from "next/navigation"
import { BiTrashAlt } from "react-icons/bi"


type Props = {
  invite: DocTeamInvite
}
const SendedInviteUser = ({ invite }: Props) => {
  const { refresh } = useRouter()
  const deleteInvite = async() => {
    await team.invite.delete(invite.teamId, invite.doc_id)
    refresh()
  }
  return (
    <div className="w-full h-9 flex items-center justify-between">
      <Member uid={invite.uid} size={32} />
      <Button onClick={deleteInvite} size='icon' variant='destructive'><BiTrashAlt /></Button>
    </div>
  )
}

export default SendedInviteUser