import { Dispatch, SetStateAction, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, useController, useForm } from 'react-hook-form'
import { z } from 'zod'

import { ModalAddOrEditPack } from '@/pages/decks/deck-modal-pack'
import { useEditPack } from '@/pages/decks/hooks-and-functions/useEditPack.ts'
import { utilityZodPackSchema } from '@/pages/decks/hooks-and-functions/utilityZodPackSchema.ts'

type DeckEditPackProps = {
  id: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  coverPack: string
  titlePack: string
  isPrivate: boolean
}

export const DeckEditPack = ({
  id,
  open,
  setOpen,
  titlePack,
  coverPack,
  isPrivate,
}: DeckEditPackProps) => {
  const { utilityEditPack } = useEditPack()

  const { initialValues, addNewPackSchema } = utilityZodPackSchema(isPrivate, titlePack)

  type NewPackSchema = z.infer<typeof addNewPackSchema>

  const [nameValue, setNameValue] = useState(titlePack)

  const hiddenInputRefCover = useRef<HTMLInputElement | null>(null)

  // const [cover, setCover] = useState<string>(coverPack)

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<NewPackSchema>({
    resolver: zodResolver(addNewPackSchema),
    defaultValues: initialValues,
  })

  const {
    field: { value, onChange },
  } = useController({
    name: 'privatePack',
    control,
    defaultValue: isPrivate,
  })

  const {
    field: { value: coverFormValue, onChange: coverFormOnChange, name: nameFieldCover },
  } = useController({ name: 'imageCover', control, defaultValue: coverPack })

  const onHandleSubmitForm = handleSubmit((form: NewPackSchema) => {
    const formData = new FormData()

    if (form.imageCover?.[0] instanceof File) {
      formData.append('cover', form.imageCover[0])
    } else if (form.imageCover === '') {
      formData.append('cover', '')
    }

    formData.append('name', form.namePack)
    formData.append('isPrivate', JSON.stringify(form.privatePack))

    utilityEditPack(id, formData)

    setOpen(!open)
  })

  const handlerClosedModal = () => {
    setOpen(!open)
  }

  const handlerNameChange = (value: string) => {
    setNameValue(value)
  }

  const handlerFormCoverOnChange = (event: FileList | undefined | string) => {
    coverFormOnChange(event)
  }

  return (
    <ModalAddOrEditPack
      open={open}
      setOpen={setOpen}
      onHandleSubmitForm={onHandleSubmitForm}
      register={register}
      errors={
        errors as FieldErrors<{
          namePack: string
          privatePack?: boolean | undefined
          imageCover?: FileList | undefined
        }>
      }
      setValue={setValue}
      nameFieldCover={nameFieldCover}
      // cover={cover}
      // setCover={setCover}
      hiddenInputRefCover={hiddenInputRefCover} //!!!
      coverFormValue={coverFormValue}
      handlerFormCoverOnChange={handlerFormCoverOnChange}
      nameValue={nameValue}
      handlerNameChange={handlerNameChange}
      value={value}
      onChange={onChange}
      handlerClosedModal={handlerClosedModal}
      headerTitle={'Edit Pack'}
      buttonTitle={'Save Changes'}
      borderBottomHeader={true}
      justifyContentHeader={'left'}
    />
  )
}
