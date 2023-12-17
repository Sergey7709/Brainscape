import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { DeckEditPack } from '@/pages/decks/deck-editPack'
import { ModalDeletePack } from '@/pages/decks/deck-modal-delete-pack'
import { useDeletePack } from '@/pages/decks/hooks-and-functions'
import { BackToDeckLink } from '@/pages/pack/backToDeckLink'
import { useGetDataForPack } from '@/pages/pack/hooks'
import s from '@/pages/pack/pack.module.scss'
import { PackDropDownMenu } from '@/pages/pack/packDropDown'

export const PackPanel = () => {
  const { dataDeck, mePackCards } = useGetDataForPack()

  const { utilityDeletePack } = useDeletePack(dataDeck?.name || '')

  const [openModalDelete, setOpenModalDelete] = useState(false)

  const [openEditModal, setOpenEditModal] = useState(false)

  const handlerDeletePack = () => {
    utilityDeletePack(dataDeck?.id || '')
    setOpenModalDelete(!openModalDelete)
  }

  const handlerOpenModal = () => {
    setOpenModalDelete(!openModalDelete)
  }

  const handlerEditModal = () => {
    setOpenEditModal(!openEditModal)
  }

  const title = mePackCards ? `My Pack: "${dataDeck?.name}"` : `Friend’s Pack: "${dataDeck?.name}"`

  const dropdown =
    mePackCards && dataDeck ? (
      <PackDropDownMenu
        id={dataDeck?.id}
        handlerEditModal={handlerEditModal}
        handlerOpenModal={handlerOpenModal}
        cardsCount={dataDeck?.cardsCount}
      />
    ) : null

  return (
    <>
      <BackToDeckLink className={s.linkPackList} />
      <div className={s.containerTitleAndButton}>
        <div className={s.containerTitle}>
          {dataDeck && <Typography variant={'large'}>{title}</Typography>}
          {dropdown}
        </div>
        {mePackCards ? (
          <Button className={s.packButton}>Add New Card</Button>
        ) : (
          <Button className={s.packButton}>Learn to Pack</Button>
        )}
      </div>
      <img
        src={dataDeck?.cover}
        alt={'Not found'}
        className={dataDeck?.cover ? s.packImg : s.packImgNone}
      />
      <ModalDeletePack
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        handlerClosedModal={handlerOpenModal}
        handlerDeletePack={handlerDeletePack}
      />
      {dataDeck && (
        <DeckEditPack
          id={dataDeck.id}
          coverPack={dataDeck.cover}
          titlePack={dataDeck.name}
          open={openEditModal}
          setOpen={setOpenEditModal}
          isPrivate={dataDeck.isPrivate}
        />
      )}
    </>
  )
}
