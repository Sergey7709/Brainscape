import { ChangeEvent } from 'react'

import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import s from './imageUploader.module.scss'

import { ChangePhoto } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type imageUploaderProps = {
  valueForm: FileList | undefined | string
  onChangeForm: (e: FileList | undefined | string) => void
  nameFieldCover?: string
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  // cover: string
  // setCover?: Dispatch<SetStateAction<string>>
  hiddenInputRef: React.RefObject<HTMLInputElement> //!!!!
}

export const ImageUploader = ({
  valueForm,
  onChangeForm,
  errorMessage,
  // cover,
  // setCover,
  hiddenInputRef, //!!!!
}: imageUploaderProps) => {
  // const hiddenInputRef = useRef<HTMLInputElement | null>(null)
  // console.log('valueForm', valueForm)
  // const valueCover = (valueForm && URL.createObjectURL(valueForm?.[0])) ?? cover
  const valueCover =
    valueForm === undefined || typeof valueForm === 'string'
      ? valueForm
      : URL.createObjectURL(valueForm?.[0]) ///!!!!

  // console.log('valueCover', valueCover)
  // console.log('valueForm', valueForm && URL.createObjectURL(valueForm?.[0]), 'cover', cover)
  // console.log('hiddenInputRef', hiddenInputRef?.current?.value)

  const handleUploadedFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    // console.log('files', files)

    // if (!files || files.length === 0) return ///!!!!!
    // const file = files[0] ///!!!!!
    //
    // onChangeForm(files) ///!!!!!
    // const objectUrl = URL.createObjectURL(file) ///!!!!!
    //
    // setCover && setCover(objectUrl) ///!!!!!
    if (!files || files.length === 0) {
      onChangeForm('')
      console.log('empty string')
    } else {
      // const file = files[0] ///!!!!!

      onChangeForm(files) ///!!!!!
      // const objectUrl = URL.createObjectURL(file) ///!!!!!

      // setCover && setCover(objectUrl) ///!!!!!
    }

    // if (!files) return
    // onChangeForm(files)
    // setCover(URL.createObjectURL(files?.[0]))
  } //!!! После загрузки и повторного выбора не отображается этот же файл в packAddCard

  const onUpload = () => {
    hiddenInputRef.current?.click()
  }

  const handleDeletedFile = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = ''
    }
    onChangeForm('')
    // setCover && setCover('')
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
      </div>
    </>
  )
}
