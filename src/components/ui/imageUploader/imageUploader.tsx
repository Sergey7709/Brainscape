import { ChangeEvent, ComponentPropsWithoutRef, useRef, useState } from 'react'

import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import s from './imageUploader.module.scss'

import { ChangePhoto } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type ImageAdderProps = {
  setValue: UseFormSetValue<{ namePack: string; privatePack?: boolean; imageCover?: FileList }>
  register: UseFormRegister<{ namePack: string; privatePack?: boolean; imageCover?: FileList }>
} & ComponentPropsWithoutRef<'input'>

export const ImageUploader = ({ register, setValue }: ImageAdderProps) => {
  const hiddenInputRef = useRef<HTMLInputElement | null>(null)

  const [cover, setCover] = useState<string>('')

  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setCover(URL.createObjectURL(file))
      setValue('imageCover', event.currentTarget.files || undefined)
    } else {
      setCover('')
      setValue('imageCover', undefined)
    }
  }

  const onUpload = () => {
    hiddenInputRef.current?.click()
  }

  return (
    <div className={s.modalAddWrapper}>
      <input
        ref={e => {
          register('imageCover')
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
        {cover ? (
          <>
            <img className={s.modalAddImageCover} src={cover} alt="Not Image" />
            <Typography variant={'subtitle2'} className={s.textCoverPreview}>
              This preview in cover, click to change
            </Typography>
          </>
        ) : (
          <>
            <ChangePhoto onClick={() => {}} />
            Click to add a cover for your pack
          </>
        )}
      </Button>
      {cover && (
        <Typography variant={'caption'} className={s.deleteCover} onClick={handleUploadedFile}>
          ❌
        </Typography>
      )}
    </div>
  )
}
