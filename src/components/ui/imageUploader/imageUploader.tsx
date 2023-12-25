import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react'

import s from './imageUploader.module.scss'

import { ChangePhoto } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type imageUploaderProps = {
  valueForm: FileList | undefined
  onChangeForm: (e: FileList | undefined | string) => void
  nameFieldCover?: string
  errorMessage?: string
  cover: string
  setCover: Dispatch<SetStateAction<string>>
}

export const ImageUploader = ({
  valueForm,
  onChangeForm,
  errorMessage,
  cover,
  setCover,
}: imageUploaderProps) => {
  const hiddenInputRef = useRef<HTMLInputElement | null>(null)

  const valueCover = (valueForm && URL.createObjectURL(valueForm?.[0])) ?? cover

  const handleUploadedFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) return
    onChangeForm(files)
    setCover(URL.createObjectURL(files?.[0]))
  }

  const onUpload = () => {
    hiddenInputRef.current?.click()
  }

  const handleDeletedFile = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = ''
    }
    onChangeForm('')
    setCover('')
  }

  return (
    <>
      <div className={s.modalAddWrapper}>
        <input
          ref={hiddenInputRef}
          type={'file'}
          accept="image/*"
          className={s.modalAddInputCover}
          onChange={handleUploadedFile}
        />
        <div className={s.coverImageUploader}>
          <Button
            as={'button'}
            type={'button'}
            variant="secondary"
            className={s.modalAddButtonCover}
            onClick={onUpload}
            fullWidth
          >
            {valueCover ? (
              <>
                <img className={s.modalAddImageCover} src={valueCover} />
                <Typography variant={'subtitle2'} className={s.textCoverPreview}>
                  This preview in cover, click to change.
                </Typography>
              </>
            ) : (
              <>
                <ChangePhoto onClick={() => {}} />
                Click to add a cover, max size 1MB.
              </>
            )}
          </Button>
          <div className={s.coverErrorWrapper}>
            {errorMessage ? <Typography variant={'error'}>{errorMessage} </Typography> : ''}
            {valueCover && (
              <Button variant={'secondary'} className={s.deleteCover} onClick={handleDeletedFile}>
                <Typography variant={'body2'}> Delete cover</Typography>
              </Button>
            )}
          </div>
        </div>
        {/*{valueCover && (*/}
        {/*  <Typography variant={'caption'} className={s.deleteCover} onClick={handleDeletedFile}>*/}
        {/*    ❌*/}
        {/*  </Typography>*/}
        {/*)}*/}
      </div>
    </>
  )
}
