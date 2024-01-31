import Notifications from './notifications'
import { ProjectsGrid } from 'ui'
import User from './user-circle'

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