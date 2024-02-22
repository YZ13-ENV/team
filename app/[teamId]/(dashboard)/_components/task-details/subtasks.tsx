'use client'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useDebounceEffect } from "ahooks"
import { SubTask, TeamTask, team } from "api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BiChevronDown } from "react-icons/bi"

type Props = {
  teamId: string
  taskId: string
  subtasks?: TeamTask["subtasks"]
}

const Subtasks = ({ taskId, teamId, subtasks = [] }: Props) => {
  const { refresh } = useRouter()
  const [tasks, setTasks] = useState<SubTask[]>(subtasks)
  const [checked, setChecked] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const updateTask = (task: object, index: number) => {
    const updatedTasks = tasks.map((old_task, i) => {
      if (i === index) return task as SubTask
      return old_task as SubTask
    })
    setTasks(updatedTasks)
  }
  const appendTask = () => {
    const task = {
      checked: checked,
      text: text
    }
    setTasks([...tasks, task])
    setChecked(false)
    setText('')
  }
  const removeTask = (index: number) => {
    const filtered = tasks.filter((_, i) => index !== i)
    setTasks(filtered)
  }
  const syncSubtasks = async () => {
    await team.task.update(teamId, taskId, { subtasks: tasks })
    refresh()
  }
  useDebounceEffect(() => {
    syncSubtasks()
  }, [tasks, setTasks], { wait: 1000 })
  return (
    <div className="pt-4 pb-6">
      <div className="w-full flex items-center gap-2">
        <div className="w-9 aspect-square flex items-center justify-center"><Checkbox checked={checked} onCheckedChange={checked => setChecked(Boolean(checked))} /></div>
        <Input placeholder="Введите текст..." value={text} onChange={e => setText(e.target.value)} />
        <Button onClick={appendTask} size='icon' variant='outline' className="shrink-0"><BiChevronDown size={16} /></Button>
      </div>
      <div className="w-full mt-4">
        {
          tasks.map((task, i) =>
            <div key={JSON.stringify(text) + i} className="w-full flex items-center gap-2">
              <div className="w-9 aspect-square flex items-center justify-center"><Checkbox checked={task.checked} onCheckedChange={updated_checked => updateTask({ ...task, checked: updated_checked }, i)} /></div>
              <span className="text-sm">{task.text}</span>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Subtasks