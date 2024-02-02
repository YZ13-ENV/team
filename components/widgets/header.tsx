import React from 'react'
import Notifications from '../shared/notifications'
import { ProjectsGrid } from 'ui'
import User from '../shared/user-circle'
import DynamicNav from '../shared/dynamic-nav'
import Image from 'next/image'
import { cdn } from 'api'
import Nav from '@/app/_components/nav'


export type NavLayout = 'visitor' | 'member' | 'founder'
type Props = {
  teamName?: string
  teamId?: string
  nav?: NavLayout
}
const Header = ({ teamId, teamName, nav='visitor' }: Props) => {
  return (
    <>
      <div className="w-full shrink-0 h-fit flex items-center justify-between px-6 pt-2 pb-1 bg-background">
        <div className="w-fit h-9 flex items-center mr-4 gap-4">
          <Image src={cdn('dm/icons/team-dark.svg')} width={32} height={32} alt='logo' />
          <span className='capitalize text-xl font-semibold'>Team / { teamName }</span>
        </div>
        <div className="w-fit h-fit flex items-center gap-2">
          <Notifications />
          <ProjectsGrid />
          <User />
        </div>
      </div>
      {
        process.env.NODE_ENV === 'development'
        ? <div className="w-full h-fit flex shrink-0 items-center gap-2 sticky top-0 px-6 pt-1 pb-2 bg-background border-b">
          <Nav teamId={teamId} nav={nav} />
        </div>
        : <DynamicNav teamId={teamId} />
      }
    </>
  )
}

export default Header