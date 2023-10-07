import s from './personal-information.module.scss'

import { Avatars as Avatar } from '@/components/ui/avatar/avatar.tsx'
import { Card } from '@/components/ui/card'
import { EditableSpan } from '@/components/ui/editable-span/editable-span.tsx'
import { Typography } from '@/components/ui/typography'

type Props = {
  name: string | null
  email: string | null
  avatar: string | null
  onLogout: () => void
  onNameChange: (newName: string) => void
  onAvatarChange: (newFile: File) => void
}

export const PersonalInformation = ({
  avatar,
  onAvatarChange,
  onNameChange,
  name,
  email,
  onLogout,
}: Props) => {
  const handleNameChanged = (name: string) => onNameChange(name)

  const handleAvatarChange = (newAvatar: File) => onAvatarChange(newAvatar)

  const handleLogout = () => onLogout()

  return (
    <Card className={s.wrapper}>
      <Typography variant={'large'}> Personal Information</Typography>
      <div className="photoContainer">
        <div>
          <Avatar src={avatar!} />
        </div>
      </div>
      <EditableSpan
        name={name!}
        email={email!}
        handleLogout={handleLogout}
        onValueChange={handleNameChanged}
      />
    </Card>
  )
}
