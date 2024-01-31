import Nav from '@/app/_components/nav'
import React from 'react'
import Notifications from '../shared/notifications'
import { ProjectsGrid } from 'ui'
import User from '../shared/user-circle'

type Props = {
  teamName?: string
  teamId?: string
}
const Header = ({ teamId, teamName }: Props) => {
  return (
    <div className="w-full h-fit flex flex-col gap-2">
      <div className="w-full h-fit flex items-center justify-between">
        <div className="w-fit h-9 flex items-center mr-4">
          <span className='capitalize text-xl font-semibold'>Team / { teamName }</span>
        </div>
        <div className="w-fit h-fit flex items-center gap-2">
          <Notifications />
          <ProjectsGrid />
          <User />
        </div>
      </div>
      <Nav teamId={teamId} />
    </div>
  )
}

export default Header