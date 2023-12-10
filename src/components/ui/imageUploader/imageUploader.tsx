import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useRef, useState } from 'react'

import { FieldValues } from 'react-hook-form'
import { UseFormRegister } from 'react-hook-form/dist/types/form'

import { ChangePhoto } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import s from '@/pages/decks/deck-addNewPack/deck-addNewPack.module.scss'

type ImageAdderProps = {
  // onAddImage: (image: File) => void
  classNameButton?: string
  classNameInput?: string
  classNameImg?: string
  // handleInputRef: () => void
  errorMessage?: string
  register: UseFormRegister<FieldValues>
  // label?: string
} & ComponentPropsWithoutRef<'input'>

export const ImageUploader = ({
  // onAddImage,
  classNameButton = '',
  classNameInput = '',
  classNameImg = '',
  // handleInputRef,
  errorMessage,
  register, // label,
}: ImageAdderProps) => {
  const hiddenInputRef = useRef<HTMLInputElement | null>(null)

  const [cover, setCover] = useState<string>('')

  const { ref: registerRef } = register('imageCover')

  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    console.log('file', file)
    // const urlImage = URL.createObjectURL(file)

    file && setCover(URL.createObjectURL(file))
  }

  const onUpload = () => {
    hiddenInputRef.current?.click()
  }

  const uploadButtonLabel = cover ? 'Change image' : 'Upload image'

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
      {/*<TextField*/}
      {/*  ref={e => {*/}
      {/*    registerRef(e)*/}
      {/*    hiddenInputRef.current = e*/}
      {/*  }}*/}
      {/*  // ref={hiddenInputRef}*/}
      {/*  type="file"*/}
      {/*  className={classNameInput}*/}
      {/*  onChange={handleUploadedFile}*/}
      {/*  {...restProps}*/}
      {/*/>*/}

      <Typography variant="error">{errorMessage}</Typography>
    </div>
  )
}

// export const ImageUploader = forwardRef<HTMLInputElement, ImageAdderProps>(
//   (
//     {
//       // onAddImage,
//       classNameButton = '',
//       classNameInput = '',
//       classNameImg = '',
//       // handleInputRef,
//       errorMessage,
//       // label,
//       ...restProps
//     },
//     ref
//   ) => {
//     const [cover, setCover] = useState<File | null>(null)
//
//     // const fileInputRef = useRef<HTMLInputElement | null>(null)
//     const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
//       const file = event.target.files?.[0]
//
//       console.log('file', file)
//       if (file) {
//         // onAddImage(file)
//         setCover(file)
//       }
//     }
//
//     const handleInputRef = () => {
//       // fileInputRef.current?.click()
//       ;(ref as React.RefObject<HTMLInputElement>).current?.click()
//     }
//
//     return (
//       <div>
//         {cover && <img className={classNameImg} src={URL.createObjectURL(cover)} alt="Not Image" />}
//         <Button
//           as={'button'}
//           variant="secondary"
//           className={classNameButton}
//           // onClick={handleInputRef}
//         >
//           {/*<ChangePhoto onClick={handleInputRef} />*/}
//
//           <input
//             ref={ref}
//             type="file"
//             className={classNameInput}
//             onChange={handleAddImage}
//             {...restProps}
//           />
//
//           <Typography variant="error">{errorMessage}</Typography>
//         </Button>
//       </div>
//     )
//   }
// )
