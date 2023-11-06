import { useState } from 'react'

import s from './decks.module.scss'

import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { Table } from '@/components/ui/tables/tables'
import { Typography } from '@/components/ui/typography'
import { columns } from '@/pages/decks/constantsDeck.ts'
import { DeckRow } from '@/pages/decks/deck-row/deck-row.tsx'
import { DecksPanel } from '@/pages/decks/decks-panel/decks-panel.tsx'
import { useGetDataSort } from '@/pages/decks/useGetDataSort.ts'
import { useAppDispatch } from '@/service'
import { currentPageReducer } from '@/service/store/deckParamsSlice.ts'

export const Decks = () => {
  const dispatch = useAppDispatch()

  const { sort, setSort, sortedData, isSuccess, isLoading, data } = useGetDataSort()

  const [currentPage, setCurrentPage] = useState<number>(data?.pagination.currentPage || 1)

  const classNames = {
    container: s.container,
    decksPanel: s.decksPanel,
    searchInput: s.searchInput,
    slider: s.slider,
    tableWrapper: s.tableWrapper,
    head: s.head,
    deck: s.deck,
    pagination: s.paginationWrapper,
  }

  const handlerPagination = (page: number) => {
    console.log('page', page)
    dispatch(currentPageReducer({ currentPage: page }))
    setCurrentPage(page)
  }

  // console.log('totalPage', data?.pagination.totalPages)

  //!!!!!!!!! Вынести <div className={classNames.container}> в отдельный компонент
  return (
    <>
      {isLoading && <Loader />}
      <div className={classNames.container}>
        <div className={classNames.deck}>
          <div className={classNames.head}>
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
        <div className={classNames.pagination}>
          {data && (
            <Pagination
              currentPage={currentPage}
              pageSize={data.pagination.itemsPerPage}
              totalCount={data.pagination.totalItems}
              onPageChange={page => handlerPagination(page)}
            />
          )}
        </div>
      </div>
    </>
  )
}
