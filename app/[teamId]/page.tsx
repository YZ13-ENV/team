import { getTeam } from "@/helpers/getTeam"
import Image from "next/image"
import { HiOutlineUserGroup } from "react-icons/hi"
import LastShots from "./_components/last-shots"

type Props = {
  params: {
    teamId: string
  }
}
export default async function Home({ params }: Props) {
  const { teamId: providedTeamId } = params
  const { team, teamId, user } = await getTeam(providedTeamId)
  return (
    <div style={{ height: 'calc(100% - 36px)' }} className="w-full pt-4 max-w-7xl mx-auto flex flex-col max-h-full gap-4">
      <div className="w-fit h-fit flex flex-col gap-2 py-12">
        <div className="w-fit h-fit flex items-center gap-4">
          {
            team && team.photoURL
            ? <Image src={team.photoURL} width={96} height={96} alt="team-photo" />
            : <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center"><HiOutlineUserGroup size={48} /></div>
          }
          <div className="w-fit h-fit flex flex-col justify-center">
            <h1 className="text-4xl font-bold">{team?.name}</h1>
            <span className="text-base text-muted-foreground">Команда</span>
          </div>
        </div>
        { team?.signature && <span className="xl:text-5xl text-4xl font-bold text-accent-foreground">{ team?.signature}</span> }
      </div>
      {/* <div className="w-fit h-fit flex items-center gap-4">
        <Button variant='outline'>И ещё что-то</Button>
        <Button variant='default'>Что-то</Button>
      </div> */}
      <div className="w-full h-fit flex flex-row items-start gap-4">
        <div className="w-2/3 flex flex-col gap-2">
          <span className='text-lg font-medium'>О команде</span>
          <span className="text-muted-foreground text-sm">{ team?.about || 'Не указано' }</span>
        </div>
        <div className="w-1/3 grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-2 grid-rows-4 gap-2">
          <div className="w-full h-full flex flex-col justify-center">
            <span className="text-xs text-muted-foreground">Сайт</span>
            <span className="text-sm line-clamp-1 text-accent-foreground">https://darkmaterial.space</span>
          </div>
        </div>
      </div>
      { teamId && <LastShots teamId={teamId} /> }
    </div>
  )
}
