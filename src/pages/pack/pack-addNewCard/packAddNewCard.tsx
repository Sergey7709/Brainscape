import { useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './packAddNewCard.module.scss'

import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Typography } from '@/components/ui/typography'
import { useAddNewCard } from '@/pages/decks/hooks-and-functions/useAddNewCard.ts'
import { utilityZodCardSchema } from '@/pages/decks/hooks-and-functions/utilityZodCardSchema.ts'
import { utilityAddFormDataCard } from '@/pages/pack/hooks-and-function'
import { ModalAddOrEditCard } from '@/pages/pack/pack-modal-card'
import { answerParams, questionParams } from '@/utils/constants/constantsForSearchParams.ts'

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
  } = useController({ name: questionParams, control })

  const {
    field: { value: answerFormValue, onChange: onChangeAnswerFormValue },
  } = useController({ name: answerParams, control })

  const onHandleSubmitForm = handleSubmit((form: NewCardSchema) => {
    const formData = new FormData()

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
      />
      <Button
        as={'button'}
        variant={'primary'}
        className={s.packButtonAddNewCard}
        onClick={() => setOpen(!open)}
      >
        <Typography variant={'body1'} className={s.packButtonAddNewCardText}>
          Add New Card
        </Typography>
      </Button>
    </>
  )
}
