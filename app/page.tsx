import UserSection from '@/components/shared/user-section'
import { Button } from '@/components/ui/button'
import { getTeam } from '@/helpers/getTeam'
import { redirect } from 'next/navigation'

const page = async() => {
  const { teamId } = await getTeam()
  if (teamId) return redirect(`/${teamId}`)
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-2'>
      <div className="max-w-md w-full h-full flex flex-col justify-between mx-auto p-6 gap-2">
        <div className="w-full flex justify-end">
          <UserSection />
        </div>
        <div className="w-full h-80 flex items-center justify-center">
          <span className='text-2xl font-semibold text-center'>Команда</span>
        </div>
        <div className="w-full h-fit flex flex-col gap-2">
          <Button>Создать команду</Button>
          <Button variant='outline'>Приглашения</Button>
        </div>
      </div>
    </div>
  )
}

export default page