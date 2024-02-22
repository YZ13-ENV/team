'use client'
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { DocTeamTask, ShortUserData, team, user } from "api"
import { DateTime } from "luxon"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import TaskTabs from "./tabs"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/app"

type Props = {
  teamId: string
  task: DocTeamTask
  children: ReactNode
}
type TaskPropertyProps = {
  propertyName?: string
  propertyValue?: ReactNode
}
const TaskDetailsModal = ({ children, task, teamId }: Props) => {
  const { refresh } = useRouter()
  const checkTask = async (checked: boolean) => {
    await team.task.update(teamId, task.doc_id, { checked: checked })
    refresh()
  }
  const [current_user] = useAuthState(auth)
  const [author, setAuthor] = useState<ShortUserData | null>(null)
  const createdAt = DateTime.fromSeconds(task.createAt).setLocale('ru').toFormat("dd MMMM yyyy")
  const TaskProperty = ({ propertyName, propertyValue }: TaskPropertyProps) => {
    return (
      <div className="w-full h-fit flex items-center gap-4">
        <div className="min-w-[25%] w-fit">
          <span className="text-sm text-muted-foreground">{propertyName}</span>
        </div>
        {
          typeof propertyValue === 'string'
            ? <span className="text-sm font-medium">{propertyValue}</span>
            : propertyValue
        }
      </div>
    )
  }
  const isAuthor = current_user ? current_user.uid === task.authorId : false
  useEffect(() => {
    user
      .byId
      .short(task.authorId)
      .then(data => setAuthor(data))
  }, [task.authorId])
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 gap-0 max-h-full">
        <DialogHeader className="p-4 flex flex-row items-center gap-4">
          <Checkbox checked={task.checked} onCheckedChange={checked => checkTask(Boolean(checked))} />
          <h3>{task.name}</h3>
        </DialogHeader>
        <div className="w-full h-fit my-6 flex flex-col gap-3 px-4">
          <TaskProperty propertyName="Создатель" propertyValue={
            <div className=" flex items-center gap-2">
              {
                author
                  ? <Image src={author.photoUrl} width={24} height={24} className="rounded-full" alt='profile-photo' />
                  : <div className="w-6 aspect-square rounded-full bg-muted" />
              }
              <span className="font-medium text-inherit">{author ? author.nickname || author.displayName : "Пользователь"}</span>
            </div>
          } />
          <TaskProperty propertyName="Дата создания" propertyValue={createdAt} />
        </div>
        <TaskTabs task={task} teamId={teamId} isAuthor={isAuthor} />
        {/* <div className="w-full h-9 border-b px-4 mt-4"> */}
        {/* <Button className="w-1/4 !rounded-b-none" variant="ghost">Комментарии</Button> */}
        {/* <Button className="w-1/4 !rounded-b-none" variant="ghost">Описание</Button> */}
        {/* <Button className="w-1/4 !rounded-b-none" variant="ghost">Подзадачи</Button> */}
        {/* <Button className="w-1/4 !rounded-b-none" variant="ghost">Настройки</Button> */}
        {/* </div> */}
        {/* <div className="w-full p-4"> */}
        {/* <span className="text-sm text-muted-foreground">{task.description || 'Нет описания'}</span> */}
        {/* </div> */}
      </DialogContent>
    </Dialog>
  )
}

export default TaskDetailsModal