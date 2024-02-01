import Member from "../shared/member/server"

type Props = {
    members: string[]
    max?: number
    size?: number
    hideNames?: boolean
}
const MembersGroup = ({ members, hideNames=false, max=3, size=24 }: Props) => {
    const limited = members.filter( (_, index) => max === 0 ? _ : index < max )
    return (
        <div className="w-fit h-fit flex flex-row items-center gap-2">
            { limited.map(uid => <Member key={uid} uid={uid} size={size} hideName={hideNames} /> ) }
        </div>
    )
}

export default MembersGroup