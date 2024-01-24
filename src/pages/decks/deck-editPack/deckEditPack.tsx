import { Dispatch, SetStateAction } from 'react'

import { ModalAddOrEditPack } from '@/pages/decks/deck-modal-pack'
import { UseEditPackFormModal } from '@/pages/decks/hooks-and-functions'

export type DeckEditPackProps = {
  id: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  coverPack: string
  titlePack: string
  isPrivate: boolean
  utilityEditPack: (id: string, body: FormData) => void
}

export const DeckEditPack = ({
  id,
  open,
  setOpen,
  titlePack,
  coverPack,
  isPrivate,
  utilityEditPack,
}: DeckEditPackProps) => {
  const {
    register,
    errors,
    setValue,
    onHandleSubmitForm,
    hiddenInputRefCover,
    value,
    onChange,
    nameFormValue,
    nameFormOnChange,
    coverFormValue,
    handlerClosedModal,
    handlerFormCoverOnChange,
  } = UseEditPackFormModal({
    id,
    open,
    setOpen,
    titlePack,
    coverPack,
    isPrivate,
    utilityEditPack,
  })

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
      headerTitle={'Edit Pack'}
      buttonTitle={'Save Changes'}
      borderBottomHeader={true}
      justifyContentHeader={'left'}
    />
  )
}
