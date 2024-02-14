import { Separator } from "@/components/ui/separator"
import Header from "@/components/widgets/header/simple-header"
import NewTeamForm from "../../_components/new-team-form"
import { getTeam } from "@/helpers/getTeam"

const page = async() => {
  const { teamId, user } = await getTeam()
  return (
    <>
      <Header />
      <div className="max-w-7xl w-full mx-auto flex flex-col py-12 px-6">
        <h1 className="text-4xl font-bold">Создайте свою команду</h1>
      </div>
      <Separator />
      <div style={{ height: 'calc(100dvh - 48px - 137px)' }} className="w-full h-screen flex flex-col relative">
        {
          teamId &&
          <div className="absolute backdrop-blur flex items-center flex-col justify-center top-0 left-0 w-full h-full z-20">
            <span className="text-center text-muted-foreground text-sm">У вас уже есть команда</span>
          </div>
        }
        {
          user
          ? <NewTeamForm alreadyCreateTeam={!!teamId} />
          : <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-center text-muted-foreground text-sm">Необходимо авторизоваться</span>
          </div>
        }
      </div>
    </>
  )
}

export default page