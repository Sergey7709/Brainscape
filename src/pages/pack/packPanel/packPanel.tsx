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

  return (
    <>
      <BackToDeckLink className={s.linkPackList} />
      <div className={s.containerTitleAndButton}>
        <div className={s.containerTitle}>
          {mePackCards ? (
            <>
              <Typography variant={'large'}>{`My Pack: "${dataDeck?.name || ''}"`}</Typography>
              <PackDropDownMenu
                id={dataDeck?.id || ''}
                handlerEditModal={handlerEditModal}
                handlerOpenModal={handlerOpenModal}
                cardsCount={dataDeck?.cardsCount || 0}
              />
            </>
          ) : (
            <Typography variant={'large'}>{`Friend’s Pack: "${dataDeck?.name || ''}"`}</Typography>
          )}
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
