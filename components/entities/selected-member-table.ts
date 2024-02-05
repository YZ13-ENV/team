import { create } from 'zustand'

type State = {
  selected: string[]
  select: (item: string) => void
  selectAll: (items: string[]) => void
  unSelectAll: () => void
}
const checkAndApply = (item: string, selected: State['selected']) => {
  if (selected.includes(item)) return selected.filter(select => select !== item)
  return [ ...selected, item ]
}
export const useSelectedStore = create<State>((set) => ({
  selected: [],
  select: (item: string) => set(({ selected }) => ({ selected: checkAndApply(item, selected) })),
  selectAll: (items: State['selected']) => set(() => ({ selected: items })),
  unSelectAll: () => set(() => ({ selected: [] }))
}))