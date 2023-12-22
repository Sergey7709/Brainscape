import { Dispatch, SetStateAction, useState } from 'react'

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
  const [cover] = useState<string>(coverPack)

  // console.log(coverPack)
  const {
    control,
    handleSubmit,
    register,
    setValue,
    clearErrors,
    resetField,
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
    // field: { value: coverValue, onChange: coverOnChange },
    field: { value: coverValue, onChange: coverOnChange, name: nameFieldCover }, ///!!!!
  } = useController({ name: 'imageCover', control })

  const onHandleSubmitForm = handleSubmit((form: NewPackSchema) => {
    const formData = new FormData()

    // console.log(form, form.imageCover)
    if (form.imageCover?.[0] instanceof File) {
      formData.append('cover', form.imageCover[0])
      // } else if (!cover) {
    } else if (form.imageCover === undefined) {
      // console.log(form.imageCover)
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

  return (
    <ModalAddOrEditPack
      // control={control}
      resetField={() => {
        resetField('imageCover')
      }}
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
      clearErrors={clearErrors}
      setValue={setValue}
      nameFieldCover={nameFieldCover} ///!!!!
      initialCover={coverPack} ///!!!!
      cover={coverValue}
      // setCover={setCover}
      setCover={e => {
        // console.log(e)
        coverOnChange(e)
      }}
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
