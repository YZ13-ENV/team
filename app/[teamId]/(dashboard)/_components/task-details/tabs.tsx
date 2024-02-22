import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Settings from "./settings"
import Subtasks from "./subtasks"
import Description from "./description"
import Comments from "./comments"
import { DocTeamTask } from "api"


type Props = {
  teamId: string
  task: DocTeamTask
  isAuthor?: boolean
}
const TaskTabs = ({ task, teamId, isAuthor = false }: Props) => {
  const tabs = [
    {
      value: "comments",
      label: "Комментарии",
      content: <Comments />
    },
    {
      value: "description",
      label: "Описание",
      content: <Description description={task.description} taskId={task.doc_id} teamId={teamId} isAuthor={isAuthor} />
    },
    {
      value: "subtasks",
      label: "Подзадачи",
      content: <Subtasks taskId={task.doc_id} teamId={teamId} subtasks={task.subtasks || []} />
    },
    {
      value: "settings",
      label: "Настройки",
      content: <Settings taskId={task.doc_id} teamId={teamId} />
    }
  ]
  return (
    <Tabs className="px-4 w-full" defaultValue="comments">
      <TabsList className="w-full">
        {
          tabs.map(tab => <TabsTrigger className="w-1/4" value={tab.value} key={tab.value}>{tab.label}</TabsTrigger>)
        }
      </TabsList>
      {
        tabs.map(tab =>
          <TabsContent key={tab.value + "-content"} value={tab.value}>
            {tab.content}
          </TabsContent>
        )
      }
    </Tabs>
  )
}

export default TaskTabs