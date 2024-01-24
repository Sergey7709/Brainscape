import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { DeckEditPack } from '@/pages/decks/deck-editPack'
import { ModalDeletePack } from '@/pages/decks/deck-modal-delete-pack'
import { useDeletePack } from '@/pages/decks/hooks-and-functions'
import { useEditPack } from '@/pages/decks/hooks-and-functions/useEditPack.ts'
import { BackToDeckLink } from '@/pages/pack/backToDeckLink'
import { PackAddNewCard } from '@/pages/pack/pack-addNewCard'
import { PackDropDown } from '@/pages/pack/packDropDown'
import s from '@/pages/pack/packPanel/packPanel.module.scss'
import { DeckType } from '@/service/decks/decks.types.ts'

type PackPanelProps = {
  dataDeck: DeckType
  mePackCards: boolean
}
export const PackPanel = ({ dataDeck, mePackCards }: PackPanelProps) => {
  const { utilityDeletePack } = useDeletePack(dataDeck?.name || '')

  const { utilityEditPack } = useEditPack()

  const navigate = useNavigate()

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

  const handlerNavigateLearn = () => {
    navigate(`/learn/${dataDeck.id}`)
  }

  return (
    <>
      <BackToDeckLink className={s.linkPackList} />
      <div className={s.containerTitleAndButton}>
        <div className={s.containerTitle}>
          {dataDeck && (
            <Typography variant={'large'} className={s.packTitle}>
              {title}
            </Typography>
          )}
          {mePackCards && dataDeck ? (
            <PackDropDown
              id={dataDeck?.id}
              handlerEditModal={handlerEditModal}
              handlerOpenModal={handlerOpenModal}
              cardsCount={dataDeck?.cardsCount}
            />
          ) : null}
        </div>
        {mePackCards ? (
          <PackAddNewCard deckId={dataDeck.id} />
        ) : (
          dataDeck.cardsCount > 0 && (
            <Button className={s.packButton} onClick={handlerNavigateLearn}>
              Learn to Pack
            </Button>
          )
        )}
      </div>
      {dataDeck?.cover ? (
        <img src={dataDeck?.cover} alt={'Not found'} className={s.packImg} />
      ) : (
        <div className={s.packImgNone} />
      )}
      {openModalDelete && (
        <ModalDeletePack
          open={openModalDelete}
          setOpen={setOpenModalDelete}
          handlerClosedModal={handlerOpenModal}
          handlerDeletePack={handlerDeletePack}
        />
      )}
      {dataDeck && (
        <DeckEditPack
          id={dataDeck.id}
          coverPack={dataDeck.cover}
          titlePack={dataDeck.name}
          open={openEditModal}
          setOpen={setOpenEditModal}
          isPrivate={dataDeck.isPrivate}
          utilityEditPack={utilityEditPack}
        />
      )}
    </>
  )
}
