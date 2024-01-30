'use client'
import { easeInOut, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  noTeam?: boolean
  children: JSX.Element | JSX.Element[]
}
const TeamContainer = ({ children, noTeam=true }: Props) => {
  const [visible, setVisible] = useState<boolean>(false)
  useEffect(() => {
      if (!noTeam) setVisible(true)
  },[noTeam])
  return (
    <motion.div initial={{ height: '10%' }} animate={{ height: noTeam ? '10%' : 'calc(100% - 136px)' }} transition={{ delay: 3, duration: 1, easings: easeInOut }}
    className="max-w-screen-2xl w-full rounded-t-2xl border-x border-t mt-auto bg-card mx-auto p-4">
      { visible && children }
    </motion.div>
  )
}

export default TeamContainer