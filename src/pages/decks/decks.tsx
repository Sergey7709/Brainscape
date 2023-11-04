import { useMemo, useState } from 'react'

import s from './decks.module.scss'

import { Button } from '@/components/ui/button'
import { Sort, Table } from '@/components/ui/tables/tables'
import { Typography } from '@/components/ui/typography'
import { columns } from '@/pages/decks/constantsDeck.ts'
import { DeckRow } from '@/pages/decks/deck-row/deck-row.tsx'
import { DecksPanel } from '@/pages/decks/decks-panel/decks-panel.tsx'
import { useGetDataSort } from '@/pages/decks/useGetDataSort.ts'
import { useGetDecksQuery } from '@/service'

export const Decks = () => {
  // const { data, isSuccess } = useGetDecksQuery()
  // const [sort, setSort] = useState<Sort>(null)
  // const sortString: string | null = sort ? `${sort?.key}-${sort?.direction}` : null
  //
  // const sortedData = useMemo(() => {
  //   if (isSuccess && !!data.items) {
  //     if (!sortString) {
  //       return data.items
  //     }
  //     const [key, direction] = sortString.split('-')
  //
  //     return [...data.items].sort((a, b) => {
  //       if (direction === 'asc') {
  //         return a[key as keyof typeof a] > b[key as keyof typeof b] ? 1 : -1
  //       }
  //
  //       return a[key as keyof typeof a] < b[key as keyof typeof b] ? 1 : -1
  //     })
  //   } else {
  //     return []
  //   } ///!!!
  // }, [sortString, data, isSuccess])

  const { sort, setSort, sortedData, isSuccess } = useGetDataSort()

  const classNames = {
    container: s.container,
    decksPanel: s.decksPanel,
    searchInput: s.searchInput,
    slider: s.slider,
    tableWrapper: s.tableWrapper,
    head: s.head,
  }

  console.log('sortedData', sortedData)

  return (
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
            {/*<Table.Head>*/}
            {/*  <Table.Row>*/}
            {/*    <Table.HeadCell>Name</Table.HeadCell>*/}
            {/*    <Table.HeadCell>Cards</Table.HeadCell>*/}
            {/*    <Table.HeadCell>Last Updated</Table.HeadCell>*/}
            {/*    <Table.HeadCell>Created by</Table.HeadCell>*/}
            {/*    <Table.HeadCell></Table.HeadCell>*/}
            {/*  </Table.Row>*/}
            {/*</Table.Head>*/}
            <Table.Body>
              {/*{isSuccess && data.items.map(deck => <DeckRow key={deck.id} {...deck} />)}*/}
              {isSuccess && sortedData.map(deck => <DeckRow key={deck.id} {...deck} />)}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
    </div>
  )
}
