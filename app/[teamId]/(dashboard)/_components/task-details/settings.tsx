'use client'
import { Button } from "@/components/ui/button"
import { team } from "api"
import { useRouter } from "next/navigation"

type Props = {
  teamId: string
  taskId: string
}
const Settings = ({ taskId, teamId }: Props) => {
  const { refresh, push } = useRouter()
  const deleteTask = async () => {
    await team.task.delete(teamId, taskId)
    refresh()
    push(`/${teamId}`)
  }
  return (
    <div className="pt-4 pb-6">
      <Button onClick={deleteTask} variant='destructive'>Удалить задачу</Button>
    </div>
  )
}

export default Settings