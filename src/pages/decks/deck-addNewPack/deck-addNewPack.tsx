import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, useController, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { ModalAddOrEditPack } from '@/pages/decks/deck-modal-pack'
import { useAddNewPack } from '@/pages/decks/hooks-and-functions/useAddNewPack.ts'
import { utilityZodPackSchema } from '@/pages/decks/hooks-and-functions/utilityZodPackSchema.ts'

const { initialValues, addNewPackSchema } = utilityZodPackSchema()

type NewPackSchema = z.infer<typeof addNewPackSchema>

export const DeckAddNewPack = () => {
  const { utilityAddNewPack } = useAddNewPack()

  const [open, setOpen] = useState(false)
  const [nameValue, setNameValue] = useState('')
  // const [cover, setCover] = useState<string>('')

  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    resetField,
    clearErrors,
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
    defaultValue: false,
  })

  const {
    field: { value: coverValue, onChange: coverOnChange, name: nameFieldCover },
  } = useController({ name: 'imageCover', control })

  const onHandleSubmitForm = handleSubmit((form: NewPackSchema) => {
    const formData = new FormData()

    if (form.imageCover?.[0] instanceof File) {
      formData.append('cover', form.imageCover[0])
    }
    formData.append('name', form.namePack)
    formData.append('isPrivate', JSON.stringify(form.privatePack))

    utilityAddNewPack(formData)

    setOpen(!open)
    setNameValue('')
    // setCover('')
    reset()
  })

  const handlerClosedModal = () => {
    setOpen(!open)
  }

  const handlerNameChange = (value: string) => {
    setNameValue(value)
  }

  const handlerCoverOnChange = (event: FileList | undefined) => {
    coverOnChange(event)
  }

  const handlerResetField = () => {
    resetField('imageCover')
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
      clearErrors={clearErrors}
      setValue={setValue}
      // cover={cover}
      // setCover={setCover}
      nameFieldCover={nameFieldCover}
      cover={coverValue}
      setCover={handlerCoverOnChange}
      resetField={handlerResetField}
      nameValue={nameValue}
      handlerNameChange={handlerNameChange}
      value={value}
      onChange={onChange}
      handlerClosedModal={handlerClosedModal}
      headerTitle={'Add new pack'}
      buttonTitle={'Add new pack'}
    >
      <Button as={'button'} variant={'primary'}>
        Add new pack
      </Button>
    </ModalAddOrEditPack>
  )
}
