import { Dispatch, SetStateAction, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'

// import { useAddNewCard } from '@/pages/decks/hooks-and-functions/useAddNewCard.ts'
import { utilityZodCardSchema } from '@/pages/decks/hooks-and-functions/utilityZodCardSchema.ts'
import { useAddNewCard } from '@/pages/pack/hooks/useEditCard.ts'
import { ModalAddOrEditCard } from '@/pages/pack/pack-modal-card'

const { initialValues, addNewCardSchema } = utilityZodCardSchema()

type NewCardSchema = z.infer<typeof addNewCardSchema>

type PackEditCardProps = {
  cardId: string
  question: string
  answer: string
  questionImage: string
  answerImage: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
export const PackEditCard = ({
  cardId,
  question,
  answer,
  questionImage,
  answerImage,
  open,
  setOpen,
}: PackEditCardProps) => {
  // const { utilityAddNewCard } = useAddNewCard()
  // const [open, setOpen] = useState(false)
  const { utilityEditCard } = useAddNewCard()

  const [coverQuestionImage, setCoverQuestionImage] = useState<string>(questionImage)
  const [coverAnswerImage, setCoverAnswerImage] = useState<string>(answerImage)

  const {
    handleSubmit,
    register,
    // reset,
    control,
    formState: { errors },
  } = useForm<NewCardSchema>({
    resolver: zodResolver(addNewCardSchema),
    // defaultValues: initialValues,
  })

  const {
    field: { value: imageQuestionFormValue, onChange: onChangeImageQuestionForm },
  } = useController({ name: 'imageQuestion', control })

  const {
    field: { value: imageAnswerFormValue, onChange: onChangeImageAnswerForm },
  } = useController({ name: 'imageAnswer', control })

  const {
    field: { value: questionFormValue, onChange: onChangeQuestionFormValue },
  } = useController({ name: 'question', control, defaultValue: question })

  const {
    field: { value: answerFormValue, onChange: onChangeAnswerFormValue },
  } = useController({ name: 'answer', control, defaultValue: answer })

  const onHandleSubmitForm = handleSubmit((form: NewCardSchema) => {
    const formData = new FormData()

    // if (form.imageAnswer?.[0] instanceof File && form.imageQuestion?.[0] instanceof File) {
    //   formData.append('questionImg', form.imageQuestion[0])
    //   formData.append('answerImg', form.imageAnswer[0])
    // }
    // if (form.imageAnswer?.[0] instanceof File && form.imageQuestion?.[0] instanceof File) {
    //   formData.append('questionImg', form.imageQuestion[0])
    //   formData.append('answerImg', form.imageAnswer[0])
    // }
    // if (form.imageQuestion === '') {
    //   formData.append('questionImg', '')
    // }
    // if (form.imageAnswer === '') {
    //   formData.append('answerImg', '')
    // }

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

    console.log(cardId, form.question, form.answer, form.imageQuestion?.[0], form.imageAnswer?.[0])

    utilityEditCard(cardId, formData)

    setOpen(!open)
    // setCoverQuestionImage('')
    // setCoverAnswerImage('')
    // reset()
  })

  const handlerClosedModal = () => {
    setOpen(!open)
  }

  // console.log('packNewCard')

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
      headerTitle={'Edit card'}
      buttonTitle={'Save Changes'}
    />
  )
}
