import { team } from "api"

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
          invites.length !== 0
          ? invites.map(invite =>
            <div key={invite.doc_id} className="w-full h-9 rounded-md bg-muted"></div>
          )
          : <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Нет активных приглашений</span>
          </div>
        }
      </div>
    </div>
  )
}

export default SendedInvites