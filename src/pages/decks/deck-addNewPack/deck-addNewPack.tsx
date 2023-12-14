import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, useController, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FILE_SIZE_LIMIT } from '@/pages/decks/constantsDeck.ts'
import { ModalAddOrEditPack } from '@/pages/decks/deck-modal-pack'
import { useAddNewPack } from '@/pages/decks/hooks-and-functions/useAddNewPack.ts'

const fileSchema = z
  .any()
  .refine(fileList => fileList[0]?.size <= FILE_SIZE_LIMIT, `Max file size is 1MB.`)

export const addNewPackSchema = z.object({
  namePack: z
    .string({
      required_error: 'Name is required',
    })
    .trim()
    .nonempty('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(30),

  privatePack: z.boolean().optional(),
  imageCover: fileSchema.optional(),
})

type NewPackSchema = z.infer<typeof addNewPackSchema>

const initialValues: NewPackSchema = {
  imageCover: undefined,
  namePack: '',
  privatePack: false,
}

export const DeckAddNewPack = () => {
  const { utilityAddNewPack } = useAddNewPack()

  const [open, setOpen] = useState(false)
  const [nameValue, setNameValue] = useState('')
  const [cover, setCover] = useState<string>('')

  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
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
    setCover('')
    reset()
  })

  const handlerClosedModal = () => {
    setOpen(!open)
  }

  const handlerNameChange = (value: string) => {
    setNameValue(value)
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
      cover={cover}
      setCover={setCover}
      nameValue={nameValue}
      handlerNameChange={handlerNameChange}
      value={value}
      onChange={onChange}
      handlerClosedModal={handlerClosedModal}
    />
  )
}
