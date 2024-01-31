'use client'
import { auth } from '@/utils/app'
import { useAuthState } from 'react-firebase-hooks/auth'

type Props = {
  noTeam?: boolean
  children: JSX.Element | JSX.Element[]
}
const TeamContainer = ({ children, noTeam=true }: Props) => {
  const [user] = useAuthState(auth)
  return (
    <div className="w-full h-full border-t mx-auto p-6">
      { user && children }
    </div>
  )
}

export default TeamContainer