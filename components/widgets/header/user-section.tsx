import Notifications from "@/components/shared/notifications"
import User from "@/components/shared/user-circle"
import { ProjectsGrid } from "ui"

const UserSection = () => {
  return (
    <div className="w-fit h-fit flex items-center gap-2">
      <Notifications />
      <ProjectsGrid />
      <User />
    </div>
  )
}

export default UserSection