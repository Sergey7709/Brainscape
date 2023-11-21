import { Delete, Play, Redactor } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import s from '@/pages/decks/decks.module.scss'
import { DeckType } from '@/service/decks/decks.types.ts'

export const DeckRow = (deck: DeckType) => {
  const updatedDateFormat = new Date(deck.updated)
    .toISOString()
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('.')

  return (
    <Table.Row key={deck.id}>
      <Table.Cell>
        <div className={s.nameContainer}>
          {deck.cover && <img className={s.imgCover} alt={'Not image'} src={deck.cover} />}
          <p className={s.textForName}> {deck.name}</p>
        </div>
      </Table.Cell>
      <Table.Cell>{deck.cardsCount}</Table.Cell>
      <Table.Cell>{updatedDateFormat}</Table.Cell>
      <Table.Cell>
        <Typography>{deck.author.name}</Typography>
      </Table.Cell>
      <Table.Cell>
        <div className={s.buttonContainer}>
          <Button variant="link" className={s.editAvatarButton}>
            <Play />
          </Button>
          <Button variant="link" className={s.editAvatarButton}>
            <Redactor />
          </Button>
          <Button variant="link" className={s.editAvatarButton}>
            <Delete />
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  )
}
