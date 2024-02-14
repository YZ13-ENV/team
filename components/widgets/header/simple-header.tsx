import { cdn } from "api"
import Image from "next/image"
import Link from "next/link"
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
const Header = () => {
  return (
    <div className="w-full shrink-0 h-fit flex items-center justify-between px-6 pt-2 pb-1 bg-background">
      <div className="w-fit h-9 flex items-center mr-4 gap-4">
        <Link href='/'>
          <Image src={cdn('dm/icons/team-dark.svg')} width={32} height={32} alt='logo' />
        </Link>
        <span className='capitalize text-xl font-semibold'>Team</span>
      </div>
      <UserSection />
    </div>
  )
}

export default Header