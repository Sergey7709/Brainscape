import { useState } from 'react'

import { useDeleteCard, useEditCard } from '../hooks-and-function'

import { Delete, Redactor } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Rating } from '@/components/ui/rating'
import { Table } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import { PackEditCard } from '@/pages/pack/pack-editCard/packEditCard.tsx'
import { ModalDeleteCard } from '@/pages/pack/pack-modal-delete-card/modalDeleteCard.tsx'
import s from '@/pages/pack/pack-row/pack-row.module.scss'
import { PackCards } from '@/service/decks/decks.types.ts'

type extendPackRow = { mePackCards: boolean } & PackCards
export const PackRow = (pack: extendPackRow) => {
  const { utilityDeleteCard, isLoading: isLoadingDelete } = useDeleteCard()

  const { utilityEditCard, isLoading: isLoadingEdit } = useEditCard() ///!!!!

  const [openEditModal, setOpenEditModal] = useState(false)

  const [openModalDelete, setOpenModalDelete] = useState(false)

  const updatedDateFormat = new Date(pack.updated)
    .toISOString()
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('.')

  const handlerOpenModalEdit = () => {
    setOpenEditModal(!openEditModal)
  }

  const handlerOpenModal = () => {
    setOpenModalDelete(!openModalDelete)
  }

  const handlerDeletePack = () => {
    utilityDeleteCard(pack.id)
    setOpenModalDelete(!openModalDelete)
  }

  return (
    <>
      <tr>
        <td>{(isLoadingDelete || isLoadingEdit) && <Loader />}</td>
      </tr>
      <Table.Row key={pack.id} className={s.packRowStyle}>
        <Table.Cell>
          <div className={s.nameContainerPackRow}>
            {pack.questionImg && (
              <img className={s.imgPackRow} alt={'Not image'} src={pack.questionImg} />
            )}
            <p className={s.textForNamePackRow}> {pack.question}</p>
          </div>
        </Table.Cell>
        <Table.Cell>
          <div className={s.nameContainerPackRow}>
            {pack.answerImg && (
              <img className={s.imgPackRow} alt={'Not image'} src={pack.answerImg} />
            )}
            <p className={s.packAnswerStyle}> {pack.answer}</p>
          </div>
        </Table.Cell>
        <Table.Cell>
          <Typography className={s.packRowDate}>{updatedDateFormat}</Typography>
        </Table.Cell>
        <Table.Cell>
          <div>
            <Rating count={5} value={pack.grade} className={s.packRating} />
          </div>
        </Table.Cell>
        <Table.Cell>
          {pack.mePackCards && (
            <div className={s.buttonContainerPackRow}>
              <Button variant="link" className={s.editButtonPackRow} onClick={handlerOpenModalEdit}>
                <Redactor />
              </Button>
              <Button variant="link" className={s.editButtonPackRow} onClick={handlerOpenModal}>
                <Delete />
              </Button>
            </div>
          )}
        </Table.Cell>
      </Table.Row>
      <tr className={s.modalRow}>
        <td>
          <PackEditCard
            cardId={pack.id}
            questionImage={pack.questionImg}
            answerImage={pack.answerImg}
            open={openEditModal}
            setOpen={setOpenEditModal}
            question={pack.question}
            answer={pack.answer}
            utilityEditCard={utilityEditCard}
          />
          <ModalDeleteCard
            open={openModalDelete}
            setOpen={setOpenModalDelete}
            handlerClosedModal={handlerOpenModal}
            handlerDeletePack={handlerDeletePack}
          />
        </td>
      </tr>
    </>
  )
}
