'use client'
import { Checkbox } from "@/components/ui/checkbox"
import { DocTeamTask, team } from "api"
import { useRouter } from "next/navigation"
import TaskDetailsModal from "./task-details/modal-wrapper"

type Props = {
  teamId: string
  task: DocTeamTask
}
const Task = ({ task, teamId }: Props) => {
  const { refresh } = useRouter()
  const checkTask = async (checked: boolean) => {
    await team.task.update(teamId, task.doc_id, { checked: checked })
    refresh()
  }
  return (
    <TaskDetailsModal task={task} teamId={teamId}>
      <div className="w-full min-h-9 flex items-center px-3 rounded-lg gap-3 group hover:bg-muted cursor-pointer">
        <Checkbox checked={task.checked} onCheckedChange={checked => checkTask(Boolean(checked))} />
        <span className="text-sm font-medium">{task.name}</span>
      </div>
    </TaskDetailsModal>
  )
}

export default Task