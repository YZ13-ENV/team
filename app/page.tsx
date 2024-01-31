import { getTeam } from '@/helpers/getTeam'
import { redirect } from 'next/navigation'

const page = async() => {
  const { teamId } = await getTeam()
  if (teamId) return redirect(`/${teamId}`)
  return (
    <div>page</div>
  )
}

export default page