'use client'
import { useSelectedStore } from "@/components/entities/selected-member-table"
import { Checkbox } from "@/components/ui/checkbox"

type Props = {
  isRoot?: boolean
  members?: string[]
  id?: string
}
const MemberCheckbox = ({ isRoot=false, members=[], id }: Props) => {
  const selected = useSelectedStore(state => state.selected)
  const select = useSelectedStore(state => state.select)
  const selectAll = useSelectedStore(state => state.selectAll)
  const unSelectAll = useSelectedStore(state => state.unSelectAll)
  const isSelected = id ? selected.includes(id) : false
  const isAllSelected = members.length === selected.length
  if (isRoot) return (
    <Checkbox checked={isAllSelected} onCheckedChange={checked => checked ? selectAll(members) : unSelectAll()} />
  )
  return (
    <Checkbox checked={isSelected} onCheckedChange={() => id && select(id)} />
  )
}

export default MemberCheckbox