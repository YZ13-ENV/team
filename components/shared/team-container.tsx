type Props = {
  noTeam?: boolean
  children: JSX.Element | JSX.Element[]
}
const TeamContainer = ({ children, noTeam=true }: Props) => {
  return (
    <div className="w-full h-full mx-auto p-6">
      { children }
    </div>
  )
}

export default TeamContainer