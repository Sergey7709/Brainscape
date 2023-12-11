import { ChangeEvent, ComponentPropsWithoutRef, useRef, useState } from 'react'

import { useForm, UseFormRegister, UseFormSetValue } from 'react-hook-form'

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

  // const { ref: registerRef, ...rest } = register('imageCover')

  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    console.log('file', file)
    if (file) {
      console.log(event.target.files)
      setCover(URL.createObjectURL(file))
      setValue('imageCover', event.currentTarget.files || undefined)
    } else {
      setCover('')
      setValue('imageCover', undefined)
    }
    // file && setCover(URL.createObjectURL(file))
  }

  const onUpload = () => {
    console.log(hiddenInputRef)
    hiddenInputRef.current?.click()
  }

  return (
    <div className={s.modalAddWrapper}>
      <input
        ref={e => {
          // registerRef(e)
          register('imageCover')
          hiddenInputRef.current = e
        }}
        //{...rest}
        // ref={hiddenInputRef}
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
            <span className={s.tooltip}>Change</span>
          </>
        ) : (
          <>
            <ChangePhoto onClick={() => {}} />
            Add cover
          </>
        )}
      </Button>
      {cover && (
        <Typography variant={'body2'} className={s.deleteCover} onClick={handleUploadedFile}>
          ❌
        </Typography>
      )}
    </div>
  )
}

// import { ChangeEvent, ComponentPropsWithoutRef, useRef, useState } from 'react'
//
// import { UseFormRegister } from 'react-hook-form'
//
// import s from './imageUploader.module.scss'
//
// import { ChangePhoto } from '@/assets/icons'
// import { Button } from '@/components/ui/button'
// import { Typography } from '@/components/ui/typography'
//
// type ImageAdderProps = {
//   register: UseFormRegister<{ namePack: string; privatePack?: boolean; imageCover?: FileList }>
// } & ComponentPropsWithoutRef<'input'>
//
// export const ImageUploader = ({ register }: ImageAdderProps) => {
//   const hiddenInputRef = useRef<HTMLInputElement | null>(null)
//
//   const [cover, setCover] = useState<string>('')
//
//   const { ref: registerRef, ...rest } = register('imageCover')
//
//   const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//
//     console.log('file', file)
//     if (file) {
//       setCover(URL.createObjectURL(file))
//     } else {
//       setCover('')
//     }
//     // file && setCover(URL.createObjectURL(file))
//   }
//
//   const onUpload = () => {
//     hiddenInputRef.current?.click()
//   }
//
//   return (
//     <div className={s.modalAddWrapper}>
//       <input
//         ref={e => {
//           // console.log(registerRef(e))
//           registerRef(e)
//           hiddenInputRef.current = e
//         }}
//         {...rest}
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
//             <span className={s.tooltip}>Change</span>
//           </>
//         ) : (
//           <>
//             <ChangePhoto onClick={() => {}} />
//             Add cover
//           </>
//         )}
//       </Button>
//       {cover && (
//         <Typography variant={'body2'} className={s.deleteCover} onClick={handleUploadedFile}>
//           ❌
//         </Typography>
//       )}
//     </div>
//   )
// }
