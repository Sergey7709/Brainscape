import s from './decks.module.scss'

import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/tables/tables'
import { Typography } from '@/components/ui/typography'
import { DeckRow } from '@/pages/decks/deck-row/deck-row.tsx'
import { DecksPanel } from '@/pages/decks/decks-panel/decks-panel.tsx'
import { useGetDecksQuery } from '@/service'

export const Decks = () => {
  const { data, isSuccess } = useGetDecksQuery()

  const classNames = {
    container: s.container,
    decksPanel: s.decksPanel,
    searchInput: s.searchInput,
    slider: s.slider,
    tableWrapper: s.tableWrapper,
    head: s.head,
  }

  return (
    <div className={classNames.container}>
      <div className={s.head}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button>Add new pack</Button>
      </div>
      <DecksPanel />
      <div className={classNames.tableWrapper}>
        <Table.Root>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Cards</Table.HeadCell>
              <Table.HeadCell>Last Updated</Table.HeadCell>
              <Table.HeadCell>Created by</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {isSuccess && data.items.map(deck => <DeckRow key={deck.id} {...deck} />)}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  )
}
