import { BaseSyntheticEvent, Dispatch, ReactElement, SetStateAction } from 'react'

import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

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
  setValue: UseFormSetValue<FormPack>
  nameFieldCover: string
  // cover: string
  // setCover: Dispatch<SetStateAction<string>>
  coverFormValue: FileList
  handlerFormCoverOnChange: (e: FileList | undefined | string) => void
  nameValue: string
  handlerNameChange: (value: string) => void
  value: any ///!!! Исправить тип
  onChange: (...event: any[]) => void
  handlerClosedModal: () => void
  children?: ReactElement
  headerTitle: string
  buttonTitle: string
  hiddenInputRefCover: React.RefObject<HTMLInputElement> //!!!!
}
export const ModalAddOrEditPack = (props: ModalAddOREditPackProps) => {
  const {
    open,
    setOpen,
    onHandleSubmitForm,
    register,
    errors,
    nameFieldCover,
    // cover,
    // setCover,
    coverFormValue,
    handlerFormCoverOnChange,
    nameValue,
    value,
    onChange,
    handlerNameChange,
    handlerClosedModal,
    borderBottomHeader,
    justifyContentHeader,
    headerTitle,
    buttonTitle,
    hiddenInputRefCover, //!!!
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
              hiddenInputRef={hiddenInputRefCover}
              // cover={cover}
              // setCover={setCover}
              valueForm={coverFormValue}
              nameFieldCover={nameFieldCover}
              errorMessage={errors.imageCover?.message}
              onChangeForm={handlerFormCoverOnChange}
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
