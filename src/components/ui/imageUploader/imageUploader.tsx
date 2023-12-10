import { ChangeEvent, ComponentPropsWithoutRef, useRef, useState } from 'react'

import { FieldValues, UseFormRegister } from 'react-hook-form'

import { ChangePhoto } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type ImageAdderProps = {
  classNameButton?: string
  classNameInput?: string
  classNameImg?: string
  errorMessage?: string
  register: UseFormRegister<FieldValues>
} & ComponentPropsWithoutRef<'input'>

export const ImageUploader = ({
  classNameButton = '',
  classNameInput = '',
  classNameImg = '',
  errorMessage,
  register,
}: ImageAdderProps) => {
  const hiddenInputRef = useRef<HTMLInputElement | null>(null)

  const [cover, setCover] = useState<string>('')

  const { ref: registerRef } = register('imageCover')

  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    console.log('file', file)

    file && setCover(URL.createObjectURL(file))
  }

  const onUpload = () => {
    hiddenInputRef.current?.click()
  }

  return (
    <div>
      {cover && <img className={classNameImg} src={cover} alt="Not Image" />}
      <Button
        as={'button'}
        type={'button'}
        variant="secondary"
        className={classNameButton}
        onClick={onUpload}
      >
        <ChangePhoto onClick={() => {}} />
      </Button>
      <input
        ref={e => {
          registerRef(e)
          hiddenInputRef.current = e
        }}
        type="file"
        className={classNameInput}
        onChange={handleUploadedFile}
      />
      <Typography variant="error">{errorMessage}</Typography>
    </div>
  )
}
