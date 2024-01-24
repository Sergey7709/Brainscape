import s from './deck-addNewPack.module.scss'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { ModalAddOrEditPack } from '@/pages/decks/deck-modal-pack'
import { UseAddNewPackFormModal } from '@/pages/decks/hooks-and-functions/useAddNewPackFormModal.ts'

export const DeckAddNewPack = () => {
  const {
    register,
    setValue,
    errors,
    value,
    onChange,
    nameFormValue,
    nameFormOnChange,
    coverFormValue,
    onHandleSubmitForm,
    handlerClosedModal,
    handlerFormCoverOnChange,
    setOpen,
    open,
    hiddenInputRefCover,
  } = UseAddNewPackFormModal()

  return (
    <ModalAddOrEditPack
      open={open}
      setOpen={setOpen}
      onHandleSubmitForm={onHandleSubmitForm}
      register={register}
      errors={errors}
      setValue={setValue}
      hiddenInputRefCover={hiddenInputRefCover}
      coverFormValue={coverFormValue}
      handlerFormCoverOnChange={handlerFormCoverOnChange}
      nameValue={nameFormValue}
      handlerNameChange={nameFormOnChange}
      value={value}
      onChange={onChange}
      handlerClosedModal={handlerClosedModal}
      headerTitle={'Add new pack'}
      buttonTitle={'Add new pack'}
    >
      <Button as={'button'} variant={'primary'} className={s.buttonAddNewPack}>
        <Typography className={s.textButtonAddNewPack}>Add New Pack</Typography>
      </Button>
    </ModalAddOrEditPack>
  )
}
