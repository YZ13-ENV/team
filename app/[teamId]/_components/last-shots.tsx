import { team } from "api"
import Image from "next/image"
import Link from "next/link"

type Props = {
  teamId: string
}
const LastShots = async({ teamId }: Props) => {
  const shots = await team.shots.last(teamId)
  return (
    <div className="w-full h-fit flex flex-col gap-4 mt-auto">
      <span className="font-medium">Последние работы</span>
      <div className="w-full h-fit grid lg:grid-cols-4 grid-cols-2 lg:grid-rows-1 grid-rows-2 gap-4">
        {
          shots.map(shot => {
            const thumbnail = shot.attachments.find(attachment => attachment.id === shot.thumbnail.id)
            if (!thumbnail) return <div key={shot.doc_id} className="w-full h-full relative aspect-[4/3] rounded-lg bg-muted flex items-center justify-center">
              <span>Ошибка при загрузке обложки!</span>
            </div>
            return (
              <div key={shot.doc_id} className="w-full h-full relative aspect-[4/3] rounded-lg group/wrapper">
                <Link href={`https://frame.darkmaterial.space/view/${shot.doc_id}`} className="absolute w-full h-full z-20 group">
                    <div
                      className="z-10 p-4 flex flex-col items-start justify-end w-full h-full transition-opacity via-accent to-transparent opacity-0 group-hover:opacity-100"
                    >
                        <span>{shot.title}</span>
                    </div>
                </Link>
                {
                  process.env.NODE_ENV === 'development'
                  ? <div className="absolute w-full h-full rounded-lg border bg-background"/>
                  : <Image src={thumbnail.url} fill className="z-0 group-hover/wrapper:brightness-50 transition-all" alt='shot-thumbnail' />
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default LastShots