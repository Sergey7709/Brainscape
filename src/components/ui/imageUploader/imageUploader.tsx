import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react'

import s from './imageUploader.module.scss'

import { ChangePhoto } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type imageUploaderProps = {
  valueForm: FileList | undefined
  onChangeForm: (e: FileList | undefined) => void
  resetField: (name: string) => void
  nameFieldCover: string
  // initialCover: string
  cover: string
  setCover: Dispatch<SetStateAction<string>>
}

export const ImageUploader = ({
  valueForm,
  onChangeForm,
  // resetField,
  // // initialCover,
  // nameFieldCover,
  // cover,
  setCover,
}: imageUploaderProps) => {
  const hiddenInputRef = useRef<HTMLInputElement | null>(null)

  // const initialValue = (value && URL.createObjectURL(value?.[0])) ?? initialCover

  // const [cover, setCover] = useState<string | undefined>(initialValue)

  // const initialValue = (valueForm && URL.createObjectURL(valueForm?.[0])) ?? cover
  const initialValue =
    valueForm instanceof FileList ? URL.createObjectURL(valueForm?.[0]) : valueForm

  console.log(valueForm)

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
    onChangeForm(undefined)
    // resetField(nameFieldCover)

    setCover('')
  }

  console.log('image')

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
        <Button
          as={'button'}
          type={'button'}
          variant="secondary"
          className={s.modalAddButtonCover}
          onClick={onUpload}
        >
          {/*{cover ? (*/}
          {initialValue ? (
            <>
              <img className={s.modalAddImageCover} src={initialValue} />
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
        {/*{cover && (*/}
        {initialValue && (
          <Typography variant={'caption'} className={s.deleteCover} onClick={handleDeletedFile}>
            ❌
          </Typography>
        )}
      </div>
    </>
  )
}
