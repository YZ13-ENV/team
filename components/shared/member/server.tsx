import { user } from "api"
import { Avatar } from "ui"

type Props = {
    uid: string
    hideName?: boolean
    className?: string
    size?: number
}
const Member = async({ uid, hideName=false, size=24 }: Props) => {
    const member = await user.byId.short(uid)
    const position = member?.position
    if (!member) return null
    return (
      <div className="relative flex items-center gap-2 w-fit h-fit">
        <Avatar className='rounded-full' src={member.photoUrl} size={size} />
        {
          !hideName &&
          <div className="w-full h-full flex flex-col">
            <span className="text-base font-medium text-accent-foreground">{member.displayName}</span>
            <span className="text-sm text-muted-foreground">{position || member.email}</span>
          </div>
        }
    </div>
    )
}

export default Member