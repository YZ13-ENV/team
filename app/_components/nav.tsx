'use client'
import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"
import { HiOutlineCollection, HiOutlineUserGroup, HiOutlineUserAdd } from "react-icons/hi";
import { TbLayoutDashboard } from "react-icons/tb";
import { BiCog } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import { NavLayout } from '@/components/widgets/header'

type NavTab = {
  value: string
  label: string
  icon?: JSX.Element
  nav?: NavLayout
}
const map = (prefix?: string, nav?: NavLayout): NavTab[] => {
  const tabs = [
    {
      value: '',
      label: 'Обзор',
      icon: <HiOutlineCollection size={18} className='shrink-0' />
    },
    {
      value: '/dashboard',
      label: 'Доска',
      icon: <TbLayoutDashboard size={18} className='shrink-0' />
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
  ]
  const founder = ['', '/dashboard', '/members', '/invite', '/settings']
  const member = ['', '/dashboard', '/members']
  const visitor = ['', '/members']
  const founder_tabs = tabs.filter(tab => founder.includes(tab.value))
  const member_tabs = tabs.filter(tab => member.includes(tab.value))
  const visitor_tabs = tabs.filter(tab => visitor.includes(tab.value))
  const implementPrefix = (tabs: NavTab[]) => tabs.map(tab => ({ ...tab, value: prefix ? prefix + tab.value : tab.value }))
  if (nav === 'member') return implementPrefix(member_tabs)
  if (nav === 'visitor') return implementPrefix(visitor_tabs)
  return implementPrefix(founder_tabs)
}
type Props = {
  teamId?: string
  nav?: NavLayout
}
const Nav = ({ teamId, nav }: Props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 836px)' })
  const path = usePathname()
  const prefixAsPath = `/${teamId}`
  const withPrefix = map(prefixAsPath, nav)
  const section = useMemo(() => {
    const parsedPath = path.split('/').filter(item => item).slice(0, 2).join('/')
    const pathWithPrefix = `/${parsedPath}`
    const detected = withPrefix.find(item => pathWithPrefix === item.value)
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