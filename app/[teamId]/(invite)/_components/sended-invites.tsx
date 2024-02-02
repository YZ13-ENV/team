import { team } from "api"
import SendedInviteUser from "./sended-invite-user"

type Props = {
  teamId: string
}
const SendedInvites = async({ teamId }: Props) => {
  const invites = await team.invite.all(teamId)
  return (
    <div className="w-80 shrink-0 h-full border-r flex flex-col gap-4 pr-6">
      <span className="text-lg font-semibold">Активные приглашения</span>
      <div className="w-full h-full flex flex-col">
        {
          !!invites.length
          ? invites.map(invite => <SendedInviteUser key={invite.doc_id} invite={invite} /> )
          : <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Нет активных приглашений</span>
          </div>
        }
      </div>
    </div>
  )
}

export default SendedInvites