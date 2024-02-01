'use client'
import { ShortUserData, user } from "api"
import { useEffect, useState } from "react"
import { Avatar } from "ui"

type Props = {
    uid: string
    hideName?: boolean
    className?: string
    size?: number
}
const Member = ({ uid, hideName=false, size=24 }: Props) => {
    const [member, setMember] = useState<ShortUserData | null>(null)
    const position = member?.position
    useEffect(() => {
      user.byId.short(uid)
      .then(short => setMember(short))
    },[uid])
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