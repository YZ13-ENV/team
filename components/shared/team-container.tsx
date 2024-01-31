'use client'
import { auth } from '@/utils/app'
import { redirect } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'

type Props = {
  noTeam?: boolean
  children: JSX.Element | JSX.Element[]
}
const TeamContainer = ({ children, noTeam=true }: Props) => {
  const [user, loading] = useAuthState(auth)
  if (!user && !loading) return redirect('/')
  return (
    <div className="w-full h-full border-t mx-auto p-6 overflow-y-auto">
      { user && children }
    </div>
  )
}

export default TeamContainer