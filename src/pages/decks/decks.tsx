import s from './decks.module.scss'

import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Table } from '@/components/ui/tables/tables'
import { Typography } from '@/components/ui/typography'
import { columns } from '@/pages/decks/constantsDeck.ts'
import { DeckRow } from '@/pages/decks/deck-row/deck-row.tsx'
import { DecksPanel } from '@/pages/decks/decks-panel/decks-panel.tsx'
import { useGetDataSort } from '@/pages/decks/useGetDataSort.ts'

export const Decks = () => {
  const { sort, setSort, sortedData, isSuccess, isLoading } = useGetDataSort()

  const classNames = {
    container: s.container,
    decksPanel: s.decksPanel,
    searchInput: s.searchInput,
    slider: s.slider,
    tableWrapper: s.tableWrapper,
    head: s.head,
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={classNames.container}>
        <div className={s.deck}>
          <div className={s.head}>
            <Typography variant={'large'}>Packs list</Typography>
            <Button>Add new pack</Button>
          </div>
          <DecksPanel />
          <div className={classNames.tableWrapper}>
            <Table.Root>
              <Table.Header columns={columns} sort={sort} onSort={setSort} />
              <Table.Body>
                {isSuccess && sortedData.map(deck => <DeckRow key={deck.id} {...deck} />)}
              </Table.Body>
            </Table.Root>
          </div>
        </div>
      </div>
    </>
  )
}
