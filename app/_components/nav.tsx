'use client'
import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"
import { HiOutlineCollection, HiOutlineUserGroup, HiOutlineUserAdd } from "react-icons/hi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BiCog } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";

type NavTab = {
  value: string
  label: string
  icon?: JSX.Element
}
const map = (prefix?: string): NavTab[] => {
  return [
    {
      value: '',
      label: 'Обзор',
      icon: <HiOutlineCollection size={18} className='shrink-0' />
    },
    {
      value: '/dashboard',
      label: 'Управление командой',
      icon: <MdOutlineManageAccounts size={18} className='shrink-0' />
      },
    {
      value: '/members',
      label: 'Участники',
      icon: <HiOutlineUserGroup size={18} className='shrink-0' />
    },
    {
      value: '/invite',
      label: 'Пригласить',
      icon: <HiOutlineUserAdd size={18} className='shrink-0' />
    },
    {
      value: '/settings',
      label: 'Настройки',
      icon: <BiCog size={18} className='shrink-0' />
    }
  ].map(tab => ({ ...tab, value: prefix ? prefix + tab.value : tab.value }))
}
type Props = {
  teamId?: string
}
const Nav = ({ teamId }: Props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 836px)' })
  const path = usePathname()
  const prefixAsPath = `/${teamId}`
  const withPrefix = map(prefixAsPath)
  const section = useMemo(() => {
    const detected = withPrefix.find(item => item.value === path)
    return detected ? detected.value : teamId ? teamId + '' : ''
  }, [path, teamId, withPrefix])
  const { push } = useRouter()
  return (
    <Tabs value={section} onValueChange={state => push(state)}>
      <TabsList className='!bg-transparent !p-0'>
        {
          withPrefix.map(({ icon, label, value }) =>
            <TabsTrigger key={value} value={value} className="gap-2 !bg-transparent relative">
              { value === section && <motion.div layoutId='main-tab' className='absolute w-full h-0.5 rounded-full bg-primary -bottom-3' /> }
              { icon && icon }
              { icon ? !isMobile && label : label }
            </TabsTrigger>
          )
        }
      </TabsList>
    </Tabs>
  )
}
export default Nav