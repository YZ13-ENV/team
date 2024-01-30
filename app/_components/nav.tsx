'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from "next/navigation"
import { useMemo } from "react"

const map = [
  {
    value: '/',
    label: 'Обзор'
  },
  {
    value: '/dashboard',
    label: 'Управление командой'
  },
  {
    value: '/members',
    label: 'Участники'
  },
  {
    value: '/invite',
    label: 'Пригласить'
  }
]

const Nav = () => {
  const path = usePathname()
  const section = useMemo(() => {
    const detected = map.find(item => item.value === path)
    return detected ? detected.value : '/'
  }, [path])
  const { push } = useRouter()
  return (
    <Tabs value={section} onValueChange={state => push(state)}>
      <TabsList>
        {
          map.map(({ label, value }) =>
            <TabsTrigger key={value} value={value}>{label}</TabsTrigger>
          )
        }
      </TabsList>
    </Tabs>
  )
}
export default Nav