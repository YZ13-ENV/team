import UserSection from '@/components/shared/user-section'
import { Button } from '@/components/ui/button'
import { getTeam } from '@/helpers/getTeam'
import { cdn } from 'api'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { StarField } from 'ui'

const page = async() => {
  const { teamId, user } = await getTeam()
  if (teamId) return redirect(`/${teamId}`)
  return (
    <div className='relative flex flex-col items-center justify-center w-full h-screen gap-2'>
      <StarField />
      <div className="flex flex-col justify-between w-full h-full gap-2 p-6 mx-auto">
        <div className="flex justify-end w-full">
          <UserSection />
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-12 my-auto h-80">
          <div className="flex items-center gap-4 w-fit h-fit">
            <Image src={cdn('dm/icons/dm-star-dark.svg')} width={64} height={64} alt='logo' />
            <span className='text-6xl text-border'>/</span>
            <Image src={cdn('dm/icons/team-dark.svg')} width={64} height={64} alt='logo' />
          </div>
          <span className='text-4xl font-semibold text-center'>Team</span>
          <span className='text-sm text-center text-muted-foreground'>
            Если вы состоите в команде вас автоматически перенаправят на страницу команды
          </span>
        </div>
        {
          user && user.isSubscriber
          ?
          <div className="flex flex-col w-full max-w-md gap-4 mx-auto h-fit">
            <Button className='w-full'>Создать команду</Button>
            <span className='text-xs text-center text-muted-foreground'>
              Вы можете создать команду, или вас могут пригласить в команду. Приглашение вы можете найти в ваших уведомлениях
            </span>
          </div>
          : <div className="flex flex-row w-full max-w-md gap-2 mx-auto h-fit">
            <span className='text-xs text-center text-muted-foreground'>
              Вы не можете создать команду, но вас могут пригласить в команду. Приглашение вы можете найти в ваших уведомлениях
            </span>
          </div>

        }
      </div>
    </div>
  )
}

export default page