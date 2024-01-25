import { useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'

import { DeckEditPackProps } from '@/pages/decks/deck-editPack'
import { utilityZodPackSchema } from '@/pages/decks/hooks-and-functions/utilityZodPackSchema.ts'
import { nameParams } from '@/utils/constants/constantsForSearchParams.ts'

export const UseEditPackFormModal = ({
  id,
  open,
  setOpen,
  titlePack,
  coverPack,
  isPrivate,
  utilityEditPack,
}: DeckEditPackProps) => {
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

  const buildFormData = (form: NewPackSchema): FormData => {
    const formData = new FormData()

    if (form.imageCover?.[0] instanceof File) {
      formData.append('cover', form.imageCover[0])
    } else if (form.imageCover === '') {
      formData.append('cover', '')
    }

    formData.append(nameParams, form.namePack)
    formData.append('isPrivate', JSON.stringify(form.privatePack))

    return formData
  }

  const onHandleSubmitForm = handleSubmit((form: NewPackSchema) => {
    const formData = buildFormData(form)

    utilityEditPack(id, formData)
    setOpen(!open)
  })

  const handlerClosedModal = () => {
    setOpen(!open)
  }

  const handlerFormCoverOnChange = (event: FileList | undefined | string) => {
    coverFormOnChange(event)
  }

  return {
    register,
    errors,
    setValue,
    onHandleSubmitForm,
    hiddenInputRefCover,
    value,
    onChange,
    nameFormValue,
    nameFormOnChange,
    coverFormValue,
    handlerClosedModal,
    handlerFormCoverOnChange,
  }
}
