'use client'
import Nav from "@/app/_components/nav"
import { useScroll } from 'ahooks'
import { cdn } from "api"
import Image from "next/image"
import { NavLayout } from "../widgets/header/default-header"
import Link from "next/link"

type Props = {
  teamId?: string
  nav?: NavLayout
}
const DynamicNav = ({ teamId, nav }: Props) => {
  const pos = useScroll(document)
  return (
    <div className="sticky top-0 flex items-center w-full gap-2 px-6 pt-1 pb-2 border-b h-fit shrink-0 bg-background">
      {
        pos && pos.top >= 50 &&
        <Link href={teamId ? `/${teamId}` : '/'}>
          <Image src={cdn('dm/icons/team-dark.svg')} width={24} height={24} alt='logo' />
        </Link>
      }
      <Nav teamId={teamId} nav={nav} />
    </div>
  )
}

export default DynamicNav