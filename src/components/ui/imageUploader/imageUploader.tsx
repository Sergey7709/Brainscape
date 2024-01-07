import { ChangeEvent, RefObject } from 'react'

import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import s from './imageUploader.module.scss'

import { ChangePhoto } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type imageUploaderProps = {
  valueForm: FileList | undefined | string
  onChangeForm: (e: FileList | undefined | string) => void
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  hiddenInputRef: RefObject<HTMLInputElement>
}

export const ImageUploader = ({
  valueForm,
  onChangeForm,
  errorMessage,
  hiddenInputRef,
}: imageUploaderProps) => {
  const valueCover =
    valueForm?.[0] && valueForm[0] instanceof File
      ? URL.createObjectURL(valueForm[0])
      : valueForm?.toString()

  const handleUploadedFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files || files.length === 0) {
      onChangeForm('')
    } else {
      onChangeForm(files)
    }
  }

  const onUpload = () => {
    hiddenInputRef.current?.click()
  }

  const handleDeletedFile = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = ''
    }
    onChangeForm('')
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
              <Button
                variant={'secondary'}
                className={s.deleteCover}
                onClick={handleDeletedFile}
                fullWidth
              >
                <Typography variant={'body2'}> Delete cover</Typography>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
