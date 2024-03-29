import DynamicNav from '../../shared/dynamic-nav'
import Image from 'next/image'
import { cdn } from 'api'
import Nav from '@/app/_components/nav'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const UserSection = dynamic(() => import('./user-section'), {
  ssr: false,
  loading: () => <div className='w-fit h-fit flex items-center gap-2'>
    <div className='w-9 aspect-square rounded-full bg-muted animate-pulse' />
    <div className='w-9 aspect-square rounded-full bg-muted animate-pulse' />
    <div className='w-9 aspect-square rounded-full bg-muted animate-pulse' />
    <div className='w-9 aspect-square rounded-full bg-muted animate-pulse' />
  </div>
})


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
          <Link href={teamId ? `/${teamId}` : '/'}>
            <Image src={cdn('dm/icons/team-dark.svg')} width={32} height={32} alt='logo' />
          </Link>
          <span className='capitalize text-xl font-semibold'>Team / { teamName }</span>
        </div>
        <UserSection />
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