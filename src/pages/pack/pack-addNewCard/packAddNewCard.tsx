import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { useAddNewCard } from '@/pages/decks/hooks-and-functions/useAddNewCard.ts'
import { utilityZodCardSchema } from '@/pages/decks/hooks-and-functions/utilityZodCardSchema.ts'
import { ModalAddOrEditCard } from '@/pages/pack/pack-modal-card'

const { initialValues, addNewCardSchema } = utilityZodCardSchema()

type NewCardSchema = z.infer<typeof addNewCardSchema>

type PackAddNewCardProps = {
  deckId: string
}
export const PackAddNewCard = ({ deckId }: PackAddNewCardProps) => {
  const { utilityAddNewCard } = useAddNewCard()

  const [open, setOpen] = useState(false)
  const [coverQuestionImage, setCoverQuestionImage] = useState<string>('')
  const [coverAnswerImage, setCoverAnswerImage] = useState<string>('')

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<NewCardSchema>({
    resolver: zodResolver(addNewCardSchema),
    defaultValues: initialValues,
  })

  const {
    field: { value: imageQuestionFormValue, onChange: onChangeImageQuestionForm },
  } = useController({ name: 'imageQuestion', control })

  const {
    field: { value: imageAnswerFormValue, onChange: onChangeImageAnswerForm },
  } = useController({ name: 'imageAnswer', control })

  const {
    field: { value: questionFormValue, onChange: onChangeQuestionFormValue },
  } = useController({ name: 'question', control })

  const {
    field: { value: answerFormValue, onChange: onChangeAnswerFormValue },
  } = useController({ name: 'answer', control })

  const onHandleSubmitForm = handleSubmit((form: NewCardSchema) => {
    const formData = new FormData()

    if (form.imageQuestion?.[0] instanceof File) {
      formData.append('questionImg', form.imageQuestion[0])
    } else if (form.imageQuestion === '') {
      formData.append('questionImg', '')
    }

    if (form.imageAnswer?.[0] instanceof File) {
      formData.append('answerImg', form.imageAnswer[0])
    } else if (form.imageAnswer === '') {
      formData.append('answerImg', '')
    }

    formData.append('question', form.question)
    formData.append('answer', form.answer)

    utilityAddNewCard(deckId, formData)

    setOpen(!open)
    setCoverQuestionImage('')
    setCoverAnswerImage('')
    reset()
  })

  const handlerClosedModal = () => {
    setOpen(!open)
  }

  return (
    <ModalAddOrEditCard
      open={open}
      setOpen={setOpen}
      onHandleSubmitForm={onHandleSubmitForm}
      register={register}
      errors={errors}
      imageQuestionFormValue={imageQuestionFormValue}
      onChangeImageQuestionForm={onChangeImageQuestionForm}
      imageAnswerFormValue={imageAnswerFormValue}
      onChangeImageAnswerForm={onChangeImageAnswerForm}
      coverQuestionImage={coverQuestionImage}
      setCoverQuestionImage={setCoverQuestionImage}
      coverAnswerImage={coverAnswerImage}
      setCoverAnswerImage={setCoverAnswerImage}
      control={control}
      questionValue={questionFormValue}
      handlerQuestionChange={onChangeQuestionFormValue}
      answerValue={answerFormValue}
      handlerAnswerChange={onChangeAnswerFormValue}
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
