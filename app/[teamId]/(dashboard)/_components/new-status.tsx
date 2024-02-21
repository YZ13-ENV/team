'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { team } from "api"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { BiCheck, BiLoaderAlt, BiPlus, BiX } from "react-icons/bi"

type Props = {
  teamId: string
  statuses?: string[]
}
const NewStatus = ({ teamId, statuses = [] }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const isBusy = useMemo(() => { return statuses.includes(name.toLowerCase()) }, [name, statuses])
  const [loading, setLoading] = useState<boolean>(false)
  const disabled = isBusy || loading
  const { refresh } = useRouter()
  const addNewStatus = async () => {
    setLoading(true)
    const loweredName = name.toLowerCase()
    await team.task.config.update(teamId, { statuses: [...statuses, loweredName] })
    setLoading(false)
    setName('')
    refresh()
    setOpen(false)
  }
  if (open) return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full flex items-center gap-2">
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Введите новый статус..."
        />
        <div className="gap-2 flex items-center">
          <Button disabled={loading} variant='destructive' size="icon"><BiX size={18} /></Button>
          <Button disabled={disabled} variant='outline' size="icon" onClick={addNewStatus}>
            {
              loading
                ? <BiLoaderAlt size={18} className="animate-spin" />
                : <BiCheck size={18} />
            }
          </Button>
        </div>
      </div>
      {isBusy && <span className="text-xs text-muted-foreground">Такой статус уже есть</span>}
    </div>
  )
  return (
    <Button onClick={() => setOpen(!open)} className="w-full gap-2 justify-start" size='lg' variant='outline'><BiPlus size={18} /> Новый статус</Button>
  )
}

export default NewStatus