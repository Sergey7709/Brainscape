import { BaseSyntheticEvent, Dispatch, ReactElement, RefObject, SetStateAction } from 'react'

import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import s from './modalAddOREditPack.module.scss'

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
  imageCover?: any
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
  coverFormValue: FileList
  handlerFormCoverOnChange: (e: FileList | undefined | string) => void
  nameValue: string
  handlerNameChange: (value: string) => void
  value: boolean | undefined
  onChange: (...event: any[]) => void
  handlerClosedModal: () => void
  children?: ReactElement
  headerTitle: string
  buttonTitle: string
  hiddenInputRefCover: RefObject<HTMLInputElement>
}
export const ModalAddOrEditPack = (props: ModalAddOREditPackProps) => {
  const {
    open,
    setOpen,
    onHandleSubmitForm,
    register,
    errors,
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
    hiddenInputRefCover,
  } = props

  return (
    <Modal open={open} setOpen={setOpen}>
      {open && (
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
                value={nameValue}
                onValueChange={handlerNameChange}
                label={'Name Pack'}
                {...register('namePack')}
                errorMessage={errors.namePack?.message}
              />
              <ImageUploader
                hiddenInputRef={hiddenInputRefCover}
                valueForm={coverFormValue}
                errorMessage={errors.imageCover?.message}
                onChangeForm={handlerFormCoverOnChange}
              />
              <Checkbox label={'Private Pack'} checked={value} onChange={onChange} />
            </ModalConstructor.Body>
            <ModalConstructor.Footer>
              <Button type={'button'} variant={'secondary'} onClick={handlerClosedModal}>
                <Typography as={'span'} variant={'body2'}>
                  Cancel
                </Typography>
              </Button>
              <Button variant={'primary'} className={s.deckEditPackSave} fullWidth>
                <Typography as={'span'} variant={'body2'}>
                  {buttonTitle}
                </Typography>
              </Button>
            </ModalConstructor.Footer>
          </form>
        </ModalConstructor.PortalAndOverlay>
      )}
      <ModalConstructor.Trigger>{props.children}</ModalConstructor.Trigger>
    </Modal>
  )
}
