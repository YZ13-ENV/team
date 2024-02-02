'use client'

import Nav from "@/app/_components/nav"
import { useScroll } from 'ahooks'
import { cdn } from "api"
import Image from "next/image"
import { NavLayout } from "../widgets/header"

type Props = {
  teamId?: string
  nav?: NavLayout
}
const DynamicNav = ({ teamId, nav }: Props) => {
  const pos = useScroll(document)
  return (
    <div className="w-full h-fit shrink-0 flex items-center gap-2 sticky top-0 px-6 pt-1 pb-2 bg-background border-b">
      {
        pos && pos.top >= 50 &&
        <Image src={cdn('dm/icons/team-dark.svg')} width={24} height={24} alt='logo' />
      }
      <Nav teamId={teamId} nav={nav} />
    </div>
  )
}

export default DynamicNav