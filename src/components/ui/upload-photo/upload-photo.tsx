import { ChangeEvent, useRef } from 'react'

import s from './upload-photo.module.scss'

import { ChangePhoto } from '@/assets/icons'
import { Button } from '@/components/ui/button'

type Props = {
  onAvatarChange: (newAvatar: File) => void
}

export const UploadPhoto = ({ onAvatarChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleAvatarSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      onAvatarChange(file)
    }
  }

  const onClickChangeAvatarHandler = () => {
    fileInputRef.current?.click()
  }

  return (
    <Button as={'button'} variant="secondary" className={s.editAvatarButton}>
      <ChangePhoto onClick={onClickChangeAvatarHandler} />
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleAvatarSelected}
        className={s.inputPhoto}
      />
    </Button>
  )
}
