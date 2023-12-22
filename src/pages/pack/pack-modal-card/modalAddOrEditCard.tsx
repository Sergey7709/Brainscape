import { BaseSyntheticEvent, Dispatch, ReactElement, SetStateAction } from 'react'

import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Modal, ModalConstructor } from '@/components/ui/modal'
import { JustifyContent } from '@/components/ui/modal/typeForModal.ts'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { PackImageCardUploader } from '@/pages/pack/pack-imageCardUploader/packImageCardUploader.tsx'

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
  clearErrors: UseFormClearErrors<FormCard>
  setValue: UseFormSetValue<FormCard>
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
    clearErrors,
    coverQuestionImage,
    setCoverQuestionImage,
    coverAnswerImage,
    setCoverAnswerImage,
    setValue,
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
            <PackImageCardUploader
              register={register}
              setValue={setValue}
              cover={coverQuestionImage}
              setCover={setCoverQuestionImage}
              errorMessage={errors.imageQuestion?.message?.toString()}
              clearErrors={clearErrors}
              fieldName={'imageQuestion'}
            />
            <TextField
              value={answerValue}
              onValueChange={handlerAnswerChange}
              label={'Answer'}
              {...register('answer')}
              errorMessage={errors.answer?.message}
            />
            <PackImageCardUploader
              register={register}
              setValue={setValue}
              cover={coverAnswerImage}
              setCover={setCoverAnswerImage}
              errorMessage={errors.imageAnswer?.message?.toString()}
              clearErrors={clearErrors}
              fieldName={'imageAnswer'}
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
