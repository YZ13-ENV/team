import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { TeamTasksConfig, team } from "api"
import Task from "./task"

type Props = {
  teamId: string
  providedConfig?: TeamTasksConfig | null
}
const TasksSection = async ({ teamId, providedConfig }: Props) => {
  const config = providedConfig ? providedConfig : await team.task.config.get(teamId)
  const tasks = await team.task.all(teamId) || []
  return (
    <Accordion type="multiple" className="space-y-3 my-6">
      {
        config &&
        config.statuses
          .map(status => {
            const filteredTasks = tasks.filter(task => task.status === status)
            const tasksCount = filteredTasks.length || 0
            return (
              <AccordionItem value={status} key={status}>
                <AccordionTrigger className="w-full h-fit flex items-center justify-between">
                  <span className="text-xl font-bold capitalize">{status} ({tasksCount})</span>
                </AccordionTrigger>
                <AccordionContent>
                  {
                    filteredTasks
                      .map(task => <Task key={task.doc_id} teamId={teamId} task={task} />)
                  }
                </AccordionContent>
              </AccordionItem>
            )
          })
      }
    </Accordion>
  )
}

export default TasksSection