import { ChangeEvent, ComponentPropsWithoutRef, useRef, useState } from 'react'

import { UseFormRegister } from 'react-hook-form'

import s from './imageUploader.module.scss'

import { ChangePhoto } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type ImageAdderProps = {
  errorMessage?: string
  register: UseFormRegister<{ namePack: string; privatePack?: boolean; imageCover?: FileList }>
} & ComponentPropsWithoutRef<'input'>

export const ImageUploader = ({ errorMessage, register }: ImageAdderProps) => {
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
    <div className={s.modalAddWrapper}>
      {cover ? <img className={s.modalAddImageCover} src={cover} alt="Not Image" /> : <div></div>}
      <input
        ref={e => {
          registerRef(e)
          hiddenInputRef.current = e
        }}
        type="file"
        accept="image/*"
        className={s.modalAddInputCover}
        onChange={handleUploadedFile}
      />
      <Button
        as={'button'}
        type={'button'}
        variant="secondary"
        className={s.modalAddButtonCover}
        onClick={onUpload}
      >
        <ChangePhoto onClick={() => {}} />
        Add cover
      </Button>
    </div>
  )
}
