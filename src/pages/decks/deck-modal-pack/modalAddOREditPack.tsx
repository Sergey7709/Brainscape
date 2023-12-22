import { BaseSyntheticEvent, Dispatch, ReactElement, SetStateAction } from 'react'

import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/check-box'
import { ImageUploader } from '@/components/ui/imageUploader/imageUploader.tsx'
import { Modal, ModalConstructor } from '@/components/ui/modal'
import { JustifyContent } from '@/components/ui/modal/typeForModal.ts'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

type FormPack = {
  namePack: string
  privatePack?: boolean | undefined
  imageCover?: FileList | undefined
}

type ModalAddOREditPackProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onHandleSubmitForm: (e: BaseSyntheticEvent | undefined) => Promise<void>
  borderBottomHeader?: boolean | undefined
  justifyContentHeader?: JustifyContent | undefined
  register: UseFormRegister<FormPack>
  errors: FieldErrors<FormPack>
  clearErrors: UseFormClearErrors<FormPack>
  setValue: UseFormSetValue<FormPack>
  nameFieldCover: string
  initialCover: string
  cover: FileList
  setCover: (e: FileList | undefined) => void
  nameValue: string
  handlerNameChange: (value: string) => void
  value: any
  onChange: (...event: any[]) => void
  handlerClosedModal: () => void
  children?: ReactElement
  headerTitle: string
  buttonTitle: string
  resetField: () => void
}
export const ModalAddOrEditPack = (props: ModalAddOREditPackProps) => {
  const {
    open,
    setOpen,
    onHandleSubmitForm,
    register,
    errors,
    resetField,
    initialCover,
    nameFieldCover,
    cover,
    setCover,
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
              value={cover}
              nameFieldCover={nameFieldCover}
              initialCover={initialCover}
              onChange={setCover}
              resetField={resetField}
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
