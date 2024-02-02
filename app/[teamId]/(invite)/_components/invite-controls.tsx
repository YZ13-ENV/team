'use client'
import { Button } from "@/components/ui/button"
import { team } from "api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BiLoaderAlt } from "react-icons/bi"


type Props = {
  teamId: string
  inviteId: string
}
const InviteControls = ({ inviteId, teamId }: Props) => {
  const { push } = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const acceptInvite = async() => {
    setLoading(true)
    const accepted = await team.invite.accept(teamId, inviteId)
    if (accepted) {
      push(`/${teamId}/members`)
      setLoading(false)
    }
  }
  const declineInvite = async() => {
    setLoading(true)
    await team.invite.delete(teamId, inviteId)
    push(`/${teamId}`)
    setLoading(false)
  }
  return (
    <div className="w-full h-fit flex items-center justify-center gap-3 max-w-md">
      <Button disabled={ loading } onClick={declineInvite} className="w-1/2 gap-2" variant='outline'>
        { loading && <BiLoaderAlt className="animate-spin" /> }
        Отклонить
      </Button>
      <Button disabled={ loading } onClick={acceptInvite} className="w-1/2 gap-2" variant='default'>
        { loading && <BiLoaderAlt className="animate-spin" /> }
        Принять
      </Button>
    </div>
  )
}

export default InviteControls