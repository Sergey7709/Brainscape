import { useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'

import { utilityZodPackSchema, useAddNewPack } from '@/pages/decks/hooks-and-functions'
import { coverParams, nameParams } from '@/utils/constants/constantsForSearchParams.ts'

export const UseAddNewPackFormModal = () => {
  const { initialValues, addNewPackSchema } = utilityZodPackSchema()

  type NewPackSchema = z.infer<typeof addNewPackSchema>

  const { utilityAddNewPack } = useAddNewPack()

  const [open, setOpen] = useState(false)

  const hiddenInputRefCover = useRef<HTMLInputElement | null>(null)

  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
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
    field: { value: nameFormValue, onChange: nameFormOnChange },
  } = useController({ name: 'namePack', control })

  const {
    field: { value: coverFormValue, onChange: coverFormOnChange },
  } = useController({ name: 'imageCover', control })

  const buildFormData = (form: NewPackSchema) => {
    const formData = new FormData()

    if (form.imageCover?.[0] instanceof File) {
      formData.append(coverParams, form.imageCover[0])
    }
    formData.append(nameParams, form.namePack)
    formData.append('isPrivate', JSON.stringify(form.privatePack))

    return formData
  }

  const onHandleSubmitForm = handleSubmit((form: NewPackSchema) => {
    const formData = buildFormData(form)

    utilityAddNewPack(formData)

    setOpen(!open)
    reset()

    if (hiddenInputRefCover.current) {
      hiddenInputRefCover.current.value = ''
    }
  })

  const handlerClosedModal = () => {
    setOpen(!open)
  }

  const handlerFormCoverOnChange = (event: FileList | undefined | string) => {
    coverFormOnChange(event)
  }

  return {
    register,
    setValue,
    errors,
    value,
    onChange,
    nameFormValue,
    nameFormOnChange,
    coverFormValue,
    onHandleSubmitForm,
    handlerClosedModal,
    handlerFormCoverOnChange,
    hiddenInputRefCover,
    open,
    setOpen,
  }
}
