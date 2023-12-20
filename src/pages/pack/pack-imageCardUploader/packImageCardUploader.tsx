import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

import { UseFormClearErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { toast } from 'react-toastify'

import s from './packImageCardUploader.module.scss'

import { ChangePhoto } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

type CardForm = {
  question: string
  imageQuestion?: FileList
  answer: string
  imageAnswer?: FileList
}
type FormImage = 'imageQuestion' | 'imageAnswer'

type ImageAdderProps = {
  setValue: UseFormSetValue<CardForm>
  register: UseFormRegister<CardForm>
  cover: string
  setCover: Dispatch<SetStateAction<string>>
  errorMessage?: string
  clearErrors?: UseFormClearErrors<CardForm>
  fieldName: FormImage
} & ComponentPropsWithoutRef<'input'>

export const PackImageCardUploader = ({
  register,
  setValue,
  cover,
  setCover,
  errorMessage,
  clearErrors,
  fieldName,
}: ImageAdderProps) => {
  const hiddenInputRef = useRef<HTMLInputElement | null>(null)

  const [key, setKey] = useState<number>(0)

  useEffect(() => {
    toast.error(errorMessage)
    clearErrors && clearErrors(fieldName)
  }, [errorMessage])
  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]

    if (file) {
      setCover(URL.createObjectURL(file))
      setValue(fieldName, event.currentTarget.files || undefined)
    }
  }

  const handleDeletedFile = () => {
    setCover('')
    fieldName && setValue(fieldName, undefined)
    setKey(key => key + 1) //To force re-rendering of the file input element at each call
  }

  const onUpload = () => {
    hiddenInputRef.current?.click()
  }

  return (
    <div className={s.modalAddWrapper}>
      <input
        key={key}
        ref={e => {
          register(fieldName)
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
      {cover && (
        <Typography variant={'caption'} className={s.deleteCover} onClick={handleDeletedFile}>
          ❌
        </Typography>
      )}
    </div>
  )
}
