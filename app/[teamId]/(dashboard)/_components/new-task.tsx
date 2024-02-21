'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { TeamTaskScratch, team } from "api"
import { DateTime } from "luxon"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BiLoaderAlt, BiPlus } from "react-icons/bi"

type Props = {
  uid?: string
  teamId: string
  statuses?: string[]
}
const NewTask = ({ teamId, statuses = [], uid }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [status, setStatus] = useState<string>(statuses[0] || "")
  const [loading, setLoading] = useState<boolean>(false)
  const disabled = !uid || loading || !status
  const { refresh } = useRouter()
  const addNewTask = async () => {
    if (uid) {
      setLoading(true)
      const task: TeamTaskScratch = {
        status: status,
        checked: checked,
        performers: [],
        name: name,
        createAt: DateTime.now().toSeconds(),
        authorId: uid
      }
      await team.task.create(teamId, task)
      refresh()
      setLoading(false)
      setName('')
      setChecked(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={open => setOpen(open)}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          variant='outline'
          className="gap-2"
        >
          <BiPlus size={18} /> Добавить
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h3>Новая задача</h3>
        </DialogHeader>
        <div className="w-full mb-6 mt-3 flex flex-col gap-4">
          <div className="w-full flex items-center">
            <div className="w-9 aspect-square flex items-center justify-center">
              <Checkbox checked={checked} onCheckedChange={checked => setChecked(Boolean(checked))} />
            </div>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Название задачи..." />
          </div>
          <Select value={status} onValueChange={value => setStatus(value)}>
            <SelectTrigger>{status ? status : "Выберите статус"}</SelectTrigger>
            <SelectContent>
              {statuses.map(status => <SelectItem key={status + "-to-select"} value={status}>{status}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={addNewTask} disabled={disabled} className="gap-2">
            {loading && <BiLoaderAlt className="animate-spin" size={18} />}
            Добавить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewTask