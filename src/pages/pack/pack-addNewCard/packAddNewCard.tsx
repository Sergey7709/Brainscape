import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { useAddNewPack } from '@/pages/decks/hooks-and-functions'
import { utilityZodCardSchema } from '@/pages/decks/hooks-and-functions/utilityZodCardSchema.ts'
import { ModalAddOrEditCard } from '@/pages/pack/pack-modal-card'

const { initialValues, addNewCardSchema } = utilityZodCardSchema()

type NewCardSchema = z.infer<typeof addNewCardSchema>

export const PackAddNewCard = () => {
  const { utilityAddNewPack } = useAddNewPack()

  const [open, setOpen] = useState(false)
  const [nameValue, setNameValue] = useState('')
  const [coverQuestionImage, setCoverQuestionImage] = useState<string>('')
  const [coverAnswerImage, setCoverAnswerImage] = useState<string>('')

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<NewCardSchema>({
    resolver: zodResolver(addNewCardSchema),
    defaultValues: initialValues,
  })

  // const onHandleSubmitForm = handleSubmit((form: NewPackSchema) => {
  const onHandleSubmitForm = handleSubmit((form: any) => {
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
    <ModalAddOrEditCard
      open={open}
      setOpen={setOpen}
      onHandleSubmitForm={onHandleSubmitForm}
      register={register}
      errors={
        errors as FieldErrors<{
          question: string
          imageQuestion?: FileList | undefined
          answer: string
          imageAnswer?: FileList | undefined
        }>
      }
      clearErrors={clearErrors}
      setValue={setValue}
      coverQuestionImage={coverQuestionImage}
      setCoverQuestionImage={setCoverQuestionImage}
      coverAnswerImage={coverAnswerImage}
      setCoverAnswerImage={setCoverAnswerImage}
      nameValue={nameValue}
      handlerNameChange={handlerNameChange}
      handlerClosedModal={handlerClosedModal}
      headerTitle={'Add new card'}
      buttonTitle={'Add new card'}
    >
      <Button as={'button'} variant={'primary'}>
        Add New Card
      </Button>
    </ModalAddOrEditCard>
  )
}
