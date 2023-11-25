import { Delete, Redactor } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Rating } from '@/components/ui/rating'
import { Table } from '@/components/ui/tables'
import s from '@/pages/pack/pack-row/pack-row.module.scss'
import { PackRowType } from '@/service/decks/decks.types.ts'

export const PackRow = (pack: PackRowType) => {
  const updatedDateFormat = new Date(pack.updated)
    .toISOString()
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('.')

  return (
    <Table.Row key={pack.id} className={s.packRowStyle}>
      {/*<Table.Row key={pack.id}>*/}
      <Table.Cell>
        {/*<Button as={NavLink} to={'/pack'} variant={'link'} className={s.linkCell} fullWidth>*/}
        <div className={s.nameContainerPackRow}>
          {pack.questionImg && (
            <img className={s.imgPackRow} alt={'Not image'} src={pack.questionImg} />
          )}
          <p className={s.textForNamePackRow}> {pack.question}</p>
        </div>
        {/*</Button>*/}
      </Table.Cell>
      <Table.Cell>
        {/*<div className={s.packAnswerStyle}>{pack.answer}</div>*/}
        <div className={s.nameContainerPackRow}>
          {pack.answer && <img className={s.imgPackRow} alt={'Not image'} src={pack.answerImg} />}
          <p className={s.packAnswerStyle}> {pack.answer}</p>
        </div>
      </Table.Cell>
      <Table.Cell>{updatedDateFormat}</Table.Cell>
      <Table.Cell>
        <div>
          <Rating count={5} value={pack.rating} />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className={s.buttonContainerPackRow}>
          <Button variant="link" className={s.editButtonPackRow}>
            <Redactor />
          </Button>
          <Button variant="link" className={s.editButtonPackRow}>
            <Delete />
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  )
}
