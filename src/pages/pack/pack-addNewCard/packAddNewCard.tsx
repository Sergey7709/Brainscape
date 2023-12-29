import { useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { useAddNewCard } from '@/pages/decks/hooks-and-functions/useAddNewCard.ts'
import { utilityZodCardSchema } from '@/pages/decks/hooks-and-functions/utilityZodCardSchema.ts'
import { utilityAddFormDataCard } from '@/pages/pack/hooks-and-function'
import { ModalAddOrEditCard } from '@/pages/pack/pack-modal-card'

const { initialValues, addNewCardSchema } = utilityZodCardSchema()

type NewCardSchema = z.infer<typeof addNewCardSchema>

type PackAddNewCardProps = {
  deckId: string
}
export const PackAddNewCard = ({ deckId }: PackAddNewCardProps) => {
  const { utilityAddNewCard, isLoading } = useAddNewCard()

  const [open, setOpen] = useState(false)

  const hiddenInputRefQuestion = useRef<HTMLInputElement | null>(null)
  const hiddenInputRefAnswer = useRef<HTMLInputElement | null>(null)

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
  } = useController({ name: 'questionImg', control })

  const {
    field: { value: imageAnswerFormValue, onChange: onChangeImageAnswerForm },
  } = useController({ name: 'answerImg', control })

  const {
    field: { value: questionFormValue, onChange: onChangeQuestionFormValue },
  } = useController({ name: 'question', control })

  const {
    field: { value: answerFormValue, onChange: onChangeAnswerFormValue },
  } = useController({ name: 'answer', control })

  const onHandleSubmitForm = handleSubmit((form: NewCardSchema) => {
    const formData = new FormData()

    // if (form.questionImg?.[0] instanceof File) {
    //   formData.append('questionImg', form.questionImg[0])
    // } else if (form.questionImg === '') {
    //   formData.append('questionImg', '')
    // }
    //
    // if (form.answerImg?.[0] instanceof File) {
    //   formData.append('answerImg', form.answerImg[0])
    // } else if (form.answerImg === '') {
    //   formData.append('answerImg', '')
    // }
    //
    // formData.append('question', form.question)
    // formData.append('answer', form.answer)

    // Object.entries(form).forEach(([key, value]) => {
    //   const isString = typeof value === 'string'
    //   const isNotURL = isString && !value.startsWith('https://')
    //
    //   if (value instanceof FileList && value.length > 0) {
    //     formData.append(key, value[0])
    //   } else if (isString && isNotURL) {
    //     formData.append(key, value)
    //   } else if (value === null || value === undefined) {
    //     formData.append(key, '')
    //   }
    // })

    utilityAddFormDataCard({ form, formData })

    utilityAddNewCard(deckId, formData)

    setOpen(!open)

    reset()

    if (hiddenInputRefQuestion.current) {
      hiddenInputRefQuestion.current.value = ''
    }
    if (hiddenInputRefAnswer.current) {
      hiddenInputRefAnswer.current.value = ''
    }
  })

  const handlerClosedModal = () => {
    setOpen(!open)
  }

  return (
    <>
      {isLoading && <Loader />}
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
        hiddenInputRefQuestion={hiddenInputRefQuestion}
        hiddenInputRefAnswer={hiddenInputRefAnswer}
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
    </>
  )
}
