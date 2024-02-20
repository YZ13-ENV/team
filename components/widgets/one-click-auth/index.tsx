'use client'
import UserToSelect from "./user-to-select"
import { useState } from "react"
import { ShortUserData } from "api"
import { Button } from "@/components/ui/button"
import { User } from "firebase/auth"

type Props = {
  onUser?: (uid: string) => void
  user?: User | null | undefined
  members?: string[]
}
const OneClickAuth = ({ onUser, members=[], user=null }: Props) => {
  const [selected, setSelected] = useState<ShortUserData | null>(null)
  const signInWithSelected = () => {
    if (selected && onUser) onUser(selected.uid)
  }
  return (
    <div className="absolute top-4 right-4 w-96 h-fit rounded-lg bg-background border z-50">
      <div className="w-full h-fit p-4 space-y-2">
        <span className="text-xs text-muted-foreground">У вас есть аккаунты, в которые вы недавно заходили</span>
        <div className="w-full flex flex-col">
          {
              members.map((member, i, arr) =>
              <UserToSelect
                key={member + "-fast-pick"}
                uid={member}
                noBorder={i === (arr.length - 1)}
                onSelect={setSelected}
                isSelected={selected ? member === selected.uid : false}
                isCurrent={user ? member === user.uid : false}
              />
            )
          }
        </div>
        {
          selected &&
          <Button className="w-full" onClick={signInWithSelected}>
            Продолжить как { selected.nickname || selected.displayName || 'Пользователь' }
          </Button>
        }
      </div>
    </div>
  )
}

export default OneClickAuth