'use client'
import SettingsBlock from '../settings-block'
import { Avatar } from 'ui'
import DropZone from '@/components/shared/drop-zone'
import { cdn, file as fileAPI, team } from 'api'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Props = {
    avatarURL?: string
    teamId?: string
}
const AvatarBlock = ({ avatarURL, teamId }: Props) => {
    const { refresh } = useRouter()
    const uploadAvatarAndSave = async(file: File) => {
        if (teamId) {
            if (avatarURL) await fileAPI.upload.delete(avatarURL)
            const link = `teams/${teamId}/avatar/${file.name}`
            const url = await fileAPI.upload.file(link, file)
            if (url) {
                await team.update(teamId, { photoURL: cdn(url) })
                refresh()
                toast('Фото профиля команды успешно обновлено')
            }
        }
    }
    return (
        <SettingsBlock
            title='Аватар'
            description='Необязательно, но рекомендуется.'
        >
            <div className="w-12 aspect-square rounded-full relative">
                <Avatar src={avatarURL || ''} size={48} />
                <DropZone disabled={!teamId} onFile={file => uploadAvatarAndSave(file)}
                className='z-20 absolute top-0 w-full aspect-square' />
            </div>
        </SettingsBlock>
    )
}

export default AvatarBlock