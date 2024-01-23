import { Sort, Table } from '@/components/ui/tables'
import { columnsDecks } from '@/pages/decks/constantsDeck.ts'
import s from '@/pages/decks/decks.module.scss'
import { useGetDataSort } from '@/pages/decks/hooks-and-functions'
import { SortedDataDeck } from '@/pages/decks/sortedDataDeck'

type DeckTableProp = {
  handlerSortValue: (sort: Sort) => void
}
export const DeckTable = ({ handlerSortValue }: DeckTableProp) => {
  const { sort, data } = useGetDataSort()

  return (
    <div className={s.tableWrapper}>
      <Table.Root>
        <Table.Header columns={columnsDecks} sort={sort} onSort={handlerSortValue}>
          <Table.Head>
            <Table.Row className={s.deckHeaderRow}>
              <Table.HeadCellList
                className={s.deckHeaderCell}
                columns={columnsDecks}
                sort={sort}
                onSort={handlerSortValue}
              />
            </Table.Row>
          </Table.Head>
        </Table.Header>
        <Table.Body>{data?.items.length ? <SortedDataDeck /> : <Table.Empty />}</Table.Body>
      </Table.Root>
    </div>
  )
}
