import { BaseSyntheticEvent, Dispatch, ReactElement, SetStateAction } from 'react'

import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/ui/imageUploader'
import { Modal, ModalConstructor } from '@/components/ui/modal'
import { JustifyContent } from '@/components/ui/modal/typeForModal.ts'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

type FormCard = {
  question: string
  imageQuestion?: FileList | undefined
  answer: string
  imageAnswer?: FileList | undefined
}

type ModalAddOrEditCardProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onHandleSubmitForm: (e: BaseSyntheticEvent | undefined) => Promise<void>
  borderBottomHeader?: boolean | undefined
  justifyContentHeader?: JustifyContent | undefined
  register: UseFormRegister<FormCard>
  errors: FieldErrors<FormCard>
  imageQuestionFormValue: FileList
  onChangeImageQuestionForm: (e: FileList | undefined | string) => void
  imageAnswerFormValue: FileList
  onChangeImageAnswerForm: (e: FileList | undefined | string) => void
  coverQuestionImage: string
  setCoverQuestionImage: Dispatch<SetStateAction<string>>
  coverAnswerImage: string
  setCoverAnswerImage: Dispatch<SetStateAction<string>>
  questionValue: string
  handlerQuestionChange: (value: string) => void
  answerValue: string
  handlerAnswerChange: (value: string) => void
  handlerClosedModal: () => void
  children?: ReactElement
  headerTitle: string
  buttonTitle: string
}
export const ModalAddOrEditCard = (props: ModalAddOrEditCardProps) => {
  const {
    open,
    setOpen,
    onHandleSubmitForm,
    register,
    errors,
    imageAnswerFormValue,
    onChangeImageQuestionForm,
    imageQuestionFormValue,
    onChangeImageAnswerForm,
    coverQuestionImage,
    setCoverQuestionImage,
    coverAnswerImage,
    setCoverAnswerImage,
    questionValue,
    handlerQuestionChange,
    answerValue,
    handlerAnswerChange,
    handlerClosedModal,
    borderBottomHeader,
    justifyContentHeader,
    headerTitle,
    buttonTitle,
  } = props

  return (
    <Modal open={open} setOpen={setOpen}>
      <ModalConstructor.PortalAndOverlay>
        <form onSubmit={onHandleSubmitForm}>
          <ModalConstructor.Head
            borderBottomHeader={borderBottomHeader}
            justifyContentHeader={justifyContentHeader}
          >
            <Typography as={'span'} variant={'large'}>
              {headerTitle}
            </Typography>
          </ModalConstructor.Head>
          <ModalConstructor.Body>
            <TextField
              value={questionValue}
              onValueChange={handlerQuestionChange}
              label={'Question'}
              {...register('question')}
              errorMessage={errors.question?.message}
            />
            <ImageUploader
              cover={coverQuestionImage}
              setCover={setCoverQuestionImage}
              valueForm={imageQuestionFormValue}
              errorMessage={errors.imageQuestion?.message}
              onChangeForm={onChangeImageQuestionForm}
            />
            <TextField
              value={answerValue}
              onValueChange={handlerAnswerChange}
              label={'Answer'}
              {...register('answer')}
              errorMessage={errors.answer?.message}
            />
            <ImageUploader
              cover={coverAnswerImage}
              setCover={setCoverAnswerImage}
              valueForm={imageAnswerFormValue}
              errorMessage={errors.imageAnswer?.message}
              onChangeForm={onChangeImageAnswerForm}
            />
          </ModalConstructor.Body>
          <ModalConstructor.Footer>
            <Button type={'button'} variant={'secondary'} onClick={handlerClosedModal}>
              <Typography as={'span'} variant={'body2'}>
                Cancel
              </Typography>
            </Button>
            <Button variant={'primary'} fullWidth>
              <Typography as={'span'} variant={'body2'}>
                {buttonTitle}
              </Typography>
            </Button>
          </ModalConstructor.Footer>
        </form>
      </ModalConstructor.PortalAndOverlay>
      <ModalConstructor.Trigger>{props.children}</ModalConstructor.Trigger>
    </Modal>
  )
}
