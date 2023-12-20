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

import s from './imageUploader.module.scss'

import { ChangePhoto } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

// type CardForm = {
//   question: string
//   imageQuestion?: FileList
//   answer: string
//   imageAnswer?: FileList
// }
// type FormImage = 'imageQuestion' | 'imageAnswer'
//
// type ImageAdderProps = {
//   setValue: UseFormSetValue<CardForm>
//   register: UseFormRegister<CardForm>
//   cover: string
//   setCover: Dispatch<SetStateAction<string>>
//   errorMessage?: string
//   clearErrors?: UseFormClearErrors<CardForm>
//   fieldName: FormImage
// } & ComponentPropsWithoutRef<'input'>

type PackForm = {
  namePack: string
  privatePack?: boolean
  imageCover?: FileList
}
type FormImage = 'imageCover'

type ImageAdderProps = {
  setValue: UseFormSetValue<PackForm>
  register: UseFormRegister<PackForm>
  cover: string
  setCover: Dispatch<SetStateAction<string>>
  errorMessage?: string
  clearErrors?: UseFormClearErrors<PackForm>
  fieldName: FormImage
} & ComponentPropsWithoutRef<'input'>

// type ImageAdderProps<T extends FieldValues> = {
//   setValue: UseFormSetValue<T>
//   register: UseFormRegister<T>
//   cover: string
//   setCover: Dispatch<SetStateAction<string>>
//   errorMessage?: string
//   clearErrors?: UseFormClearErrors<T>
//   fieldName: string
// } & ComponentPropsWithoutRef<'input'>

// export const ImageUploader = <T extends FieldValues>({
export const ImageUploader = ({
  register,
  setValue,
  cover,
  setCover,
  errorMessage,
  clearErrors,
  fieldName,
}: ImageAdderProps) => {
  // }: ImageAdderProps<T>) => {
  const hiddenInputRef = useRef<HTMLInputElement | null>(null)

  const [key, setKey] = useState<number>(0)

  useEffect(() => {
    toast.error(errorMessage)
    clearErrors && clearErrors(fieldName)
  }, [errorMessage])
  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setCover(URL.createObjectURL(file))
      setValue(fieldName, event.target.files || undefined)
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

///!!!!!!!!!!!!!!!
// type ImageAdderProps = {
//   setValue: UseFormSetValue<{ namePack: string; privatePack?: boolean; imageCover?: FileList }>
//   register: UseFormRegister<{ namePack: string; privatePack?: boolean; imageCover?: FileList }>
//   cover: string
//   setCover: Dispatch<SetStateAction<string>>
//   errorMessage?: string
//   clearErrors?: UseFormClearErrors<{
//     namePack: string
//     privatePack?: boolean
//     imageCover?: FileList
//   }>
// } & ComponentPropsWithoutRef<'input'>
//
// export const ImageUploader = ({
//   register,
//   setValue,
//   cover,
//   setCover,
//   errorMessage,
//   clearErrors,
// }: ImageAdderProps) => {
//   const hiddenInputRef = useRef<HTMLInputElement | null>(null)
//
//   const [key, setKey] = useState<number>(0)
//
//   useEffect(() => {
//     toast.error(errorMessage)
//     clearErrors && clearErrors('imageCover')
//   }, [errorMessage])
//   const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//
//     if (file) {
//       setCover(URL.createObjectURL(file))
//       setValue('imageCover', event.target.files || undefined)
//     }
//   }
//
//   const handleDeletedFile = () => {
//     setCover('')
//     setValue('imageCover', undefined)
//     setKey(key => key + 1) //To force re-rendering of the file input element at each call
//   }
//
//   const onUpload = () => {
//     hiddenInputRef.current?.click()
//   }
//
//   return (
//     <div className={s.modalAddWrapper}>
//       <input
//         key={key}
//         ref={e => {
//           register('imageCover')
//           hiddenInputRef.current = e
//         }}
//         type="file"
//         accept="image/*"
//         className={s.modalAddInputCover}
//         onChange={handleUploadedFile}
//       />
//       <Button
//         as={'button'}
//         type={'button'}
//         variant="secondary"
//         className={s.modalAddButtonCover}
//         onClick={onUpload}
//       >
//         {cover ? (
//           <>
//             <img className={s.modalAddImageCover} src={cover} alt="Not Image" />
//             <Typography variant={'subtitle2'} className={s.textCoverPreview}>
//               This preview in cover, click to change.
//             </Typography>
//           </>
//         ) : (
//           <>
//             <ChangePhoto onClick={() => {}} />
//             Click to add a cover, max size 1MB.
//           </>
//         )}
//       </Button>
//       {cover && (
//         <Typography variant={'caption'} className={s.deleteCover} onClick={handleDeletedFile}>
//           ❌
//         </Typography>
//       )}
//     </div>
//   )
// }
///!!!!!!!!!!!!!!!!!!!!
// type ImageAdderProps = {
//   setValue: UseFormSetValue<{ namePack: string; privatePack?: boolean; imageCover?: FileList }>
//   register: UseFormRegister<{ namePack: string; privatePack?: boolean; imageCover?: FileList }>
//   cover: string
//   setCover: Dispatch<SetStateAction<string>>
//   errorMessage?: string
//   clearErrors?: UseFormClearErrors<{
//     namePack: string
//     privatePack?: boolean
//     imageCover?: FileList
//   }>
// } & ComponentPropsWithoutRef<'input'>
//
// export const ImageUploader = ({
//   register,
//   setValue,
//   cover,
//   setCover,
//   errorMessage,
//   clearErrors,
// }: ImageAdderProps) => {
//   const hiddenInputRef = useRef<HTMLInputElement | null>(null)
//
//   const [key, setKey] = useState<number>(0)
//
//   useEffect(() => {
//     toast.error(errorMessage)
//     clearErrors && clearErrors('imageCover')
//   }, [errorMessage])
//   const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//
//     if (file) {
//       setCover(URL.createObjectURL(file))
//       setValue('imageCover', event.target.files || undefined)
//     }
//   }
//
//   const handleDeletedFile = () => {
//     setCover('')
//     setValue('imageCover', undefined)
//     setKey(key => key + 1) //To force re-rendering of the file input element at each call
//   }
//
//   const onUpload = () => {
//     hiddenInputRef.current?.click()
//   }
//
//   return (
//     <div className={s.modalAddWrapper}>
//       <input
//         key={key}
//         ref={e => {
//           register('imageCover')
//           hiddenInputRef.current = e
//         }}
//         type="file"
//         accept="image/*"
//         className={s.modalAddInputCover}
//         onChange={handleUploadedFile}
//       />
//       <Button
//         as={'button'}
//         type={'button'}
//         variant="secondary"
//         className={s.modalAddButtonCover}
//         onClick={onUpload}
//       >
//         {cover ? (
//           <>
//             <img className={s.modalAddImageCover} src={cover} alt="Not Image" />
//             <Typography variant={'subtitle2'} className={s.textCoverPreview}>
//               This preview in cover, click to change.
//             </Typography>
//           </>
//         ) : (
//           <>
//             <ChangePhoto onClick={() => {}} />
//             Click to add a cover, max size 1MB.
//           </>
//         )}
//       </Button>
//       {cover && (
//         <Typography variant={'caption'} className={s.deleteCover} onClick={handleDeletedFile}>
//           ❌
//         </Typography>
//       )}
//     </div>
//   )
// }
