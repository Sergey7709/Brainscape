import { BaseSyntheticEvent, Dispatch, ReactElement, SetStateAction } from 'react'

import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/check-box'
import { ImageUploader } from '@/components/ui/imageUploader'
import { Modal, ModalConstructor } from '@/components/ui/modal'
import { JustifyContent } from '@/components/ui/modal/typeForModal.ts'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

type ModalAddOREditPackProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onHandleSubmitForm: (e: BaseSyntheticEvent | undefined) => Promise<void>
  borderBottomHeader?: boolean | undefined
  justifyContentHeader?: JustifyContent | undefined
  register: UseFormRegister<{
    namePack: string
    privatePack?: boolean | undefined
    imageCover?: FileList | undefined
  }>
  errors: FieldErrors<{
    namePack: string
    privatePack?: boolean | undefined
    imageCover?: FileList | undefined
  }>
  clearErrors: UseFormClearErrors<{
    namePack: string
    privatePack?: boolean | undefined
    imageCover?: FileList | undefined
  }>
  setValue: UseFormSetValue<{
    namePack: string
    privatePack?: boolean | undefined
    imageCover?: FileList | undefined
  }>
  cover: string
  setCover: Dispatch<SetStateAction<string>>
  nameValue: string
  handlerNameChange: (value: string) => void
  value: any
  onChange: (...event: any[]) => void
  handlerClosedModal: () => void
  children?: ReactElement
  headerTitle: string
  buttonTitle: string
}
export const ModalAddOrEditPack = (props: ModalAddOREditPackProps) => {
  const {
    open,
    setOpen,
    onHandleSubmitForm,
    register,
    errors,
    clearErrors,
    cover,
    setCover,
    setValue,
    nameValue,
    value,
    onChange,
    handlerNameChange,
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
            <ImageUploader
              register={register}
              setValue={setValue}
              cover={cover}
              setCover={setCover}
              errorMessage={errors.imageCover?.message?.toString()}
              clearErrors={clearErrors}
            />
            <TextField
              value={nameValue}
              onValueChange={handlerNameChange}
              label={'Name Pack'}
              {...register('namePack')}
              errorMessage={errors.namePack?.message}
            />
            <Checkbox label={'Private Pack'} checked={value} onChange={onChange} />
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
