'use client'

import Nav from "@/app/_components/nav"
import { useScroll } from 'ahooks'
import { cdn } from "api"
import Image from "next/image"

type Props = {
  teamId?: string
}
const DynamicNav = ({ teamId }: Props) => {
  const pos = useScroll(document)
  return (
    <div className="w-full h-fit flex items-center gap-2 sticky top-0 px-6 pt-1 pb-2 bg-background border-b">
      {
        pos && pos.top >= 50 &&
        <Image src={cdn('dm/icons/team-dark.svg')} width={24} height={24} alt='logo' />
      }
      <Nav teamId={teamId} />
    </div>
  )
}

export default DynamicNav