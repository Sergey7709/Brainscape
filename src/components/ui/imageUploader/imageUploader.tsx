import { ChangeEvent, FC, useRef } from 'react'

import { ChangePhoto } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type ImageAdderProps = {
  onAddImage: (image: File) => void
  classNameButton?: string
  classNameInput?: string
}

export const ImageUploader: FC<ImageAdderProps> = ({
  onAddImage,
  classNameButton = '',
  classNameInput = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      onAddImage(file)
    }
  }

  const handleInputRef = () => {
    fileInputRef.current?.click()
  }

  return (
    <Button as={'button'} variant="secondary" className={classNameButton} onClick={handleInputRef}>
      <ChangePhoto onClick={handleInputRef} />

      <input ref={fileInputRef} type="file" className={classNameInput} onChange={handleAddImage} />

      <Typography variant={'body2'}>Add image</Typography>
    </Button>
  )
}
