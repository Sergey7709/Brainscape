import { memo, useCallback } from 'react'

import s from './personal-information.module.scss'

import { Avatars as Avatar } from '@/components/ui/avatar/avatar.tsx'
import { Card } from '@/components/ui/card'
import { EditableSpan } from '@/components/ui/editable-span/editable-span.tsx'
import { Typography } from '@/components/ui/typography'
import { UploadPhoto } from '@/components/ui/upload-photo/upload-photo.tsx'

type Props = {
  email?: string | null
  avatar: string | null
  name: string | null
  onLogout: () => void
  onAvatarChange: (newAvatar: File) => void
  onNameChange: (newName: string) => void
  onEmailChange: (newEmail: string) => void
}

export const PersonalInformation = memo(
  ({ avatar, email, name, onAvatarChange, onNameChange, onEmailChange, onLogout }: Props) => {
    const handleNameChanged = useCallback(
      (newName: string) => onNameChange(newName),
      [onNameChange]
    )

    const handleAvatarChange = useCallback(
      (newAvatar: File) => onAvatarChange(newAvatar),
      [onAvatarChange]
    )

    const handleEmailChange = useCallback(
      (newEmail: string) => {
        onEmailChange(newEmail)
      },
      [onEmailChange]
    )
    const handleLogout = () => onLogout()

    return (
      <Card className={s.profileContainer}>
        <Typography variant="large" className={s.title}>
          Personal Information
        </Typography>
        <div className={s.photoContainer}>
          <div>
            <Avatar src={avatar!} />
            <UploadPhoto onAvatarChange={handleAvatarChange} />
          </div>
        </div>
        <EditableSpan
          name={name!}
          email={email!}
          handleLogout={handleLogout}
          onNameChange={handleNameChanged}
          onEmailChange={handleEmailChange}
        />
      </Card>
    )
  }
)
