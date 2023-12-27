import { Dispatch, SetStateAction, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'

import { ModalAddOrEditPack } from '@/pages/decks/deck-modal-pack'
import { utilityZodPackSchema } from '@/pages/decks/hooks-and-functions/utilityZodPackSchema.ts'

type DeckEditPackProps = {
  id: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  coverPack: string
  titlePack: string
  isPrivate: boolean
  utilityEditPack: (id: string, body: FormData) => void //!!!
}

export const DeckEditPack = ({
  id,
  open,
  setOpen,
  titlePack,
  coverPack,
  isPrivate,
  utilityEditPack,
}: DeckEditPackProps) => {
  // const { utilityEditPack } = useEditPack()

  const { initialValues, addNewPackSchema } = utilityZodPackSchema(isPrivate, titlePack)

  type NewPackSchema = z.infer<typeof addNewPackSchema>

  const hiddenInputRefCover = useRef<HTMLInputElement | null>(null)

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
    field: { value: nameFormValue, onChange: nameFormOnChange },
  } = useController({ name: 'namePack', control })

  const {
    field: { value: coverFormValue, onChange: coverFormOnChange },
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

  const handlerFormCoverOnChange = (event: FileList | undefined | string) => {
    coverFormOnChange(event)
  }

  return (
    <ModalAddOrEditPack
      open={open}
      setOpen={setOpen}
      onHandleSubmitForm={onHandleSubmitForm}
      register={register}
      errors={errors}
      setValue={setValue}
      hiddenInputRefCover={hiddenInputRefCover}
      coverFormValue={coverFormValue}
      handlerFormCoverOnChange={handlerFormCoverOnChange}
      nameValue={nameFormValue}
      handlerNameChange={nameFormOnChange}
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
