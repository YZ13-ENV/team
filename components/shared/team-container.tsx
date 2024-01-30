type Props = {
  noTeam?: boolean
  children: JSX.Element | JSX.Element[]
}
const TeamContainer = ({ children, noTeam=true }: Props) => {
  return (
    <div style={{ height: noTeam ? '10%' : 'calc(100% - 136px)' }}
    className="max-w-screen-2xl w-full rounded-t-2xl border-x border-t mt-auto bg-card mx-auto p-6">
      { children }
    </div>
  )
}

export default TeamContainer