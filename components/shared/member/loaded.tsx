'use client'
import { ShortUserData } from "api"
import { Avatar } from "ui"

type Props = {
    member?: ShortUserData
    hideName?: boolean
    className?: string
    size?: number
}
const Member = ({ member, hideName=false, size=24 }: Props) => {
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