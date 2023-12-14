import { NavLink } from 'react-router-dom'

import { Delete, Play, Redactor } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import s from '@/pages/decks/decks.module.scss'
import { useSaveUrlDeck } from '@/pages/pack/hooks'
import { useGetAuthUserMeDataQuery } from '@/service'
import { DeckType } from '@/service/decks/decks.types.ts'

export const DeckRow = (deck: DeckType) => {
  const { data: dataMeId } = useGetAuthUserMeDataQuery()

  const meDeck = dataMeId?.id === deck?.userId

  const updatedDateFormat = new Date(deck.updated)
    .toISOString()
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('.')

  const saveUrlDeck = useSaveUrlDeck()

  return (
    <Table.Row key={deck.id}>
      <Table.Cell>
        <Button
          as={NavLink}
          variant={'link'}
          to={`/pack/${deck.id}`}
          className={s.linkCell}
          onClick={saveUrlDeck}
          fullWidth
        >
          <div className={s.nameContainer}>
            {deck.cover && <img className={s.imgCover} alt={'Not image'} src={deck.cover} />}
            <p className={s.textForName}> {deck.name}</p>
          </div>
        </Button>
      </Table.Cell>
      <Table.Cell>{deck.cardsCount}</Table.Cell>
      <Table.Cell>{updatedDateFormat}</Table.Cell>
      <Table.Cell>
        <Typography>{deck.author.name}</Typography>
      </Table.Cell>
      <Table.Cell>
        <div className={s.buttonContainer}>
          <Button
            variant={'link'}
            as={NavLink}
            to={`/learn/${deck.id}`}
            className={deck.cardsCount > 0 ? s.buttonRow : s.disabledButtonRow}
            onClick={saveUrlDeck}
          >
            <Play />
          </Button>
          {meDeck && (
            <>
              <Button variant="link" className={s.buttonRow}>
                <Redactor />
              </Button>
              <Button variant="link" className={s.buttonRow}>
                <Delete />
              </Button>
            </>
          )}
        </div>
      </Table.Cell>
    </Table.Row>
  )
}
