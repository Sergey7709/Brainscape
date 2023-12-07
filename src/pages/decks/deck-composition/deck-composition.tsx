import { memo } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './../decks.module.scss'

import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { Sort, Table } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import { columnsDecks } from '@/pages/decks/constantsDeck.ts'
import { DeckItemsPerPage } from '@/pages/decks/deckItemsPerPage'
import { DecksPanel } from '@/pages/decks/decks-panel/decks-panel.tsx'
import { useGetDataSort } from '@/pages/decks/hooks-and-functions/useGetDataSort.ts'
import { RenderNoDataDeck } from '@/pages/decks/renderNoDataDeck'
import { SortedDataDeck } from '@/pages/decks/sortedDataDeck'
import { currentPageValue } from '@/service'
import { useUtilityForSearchParamsEdit } from '@/utils'

export const DeckComposition = memo(() => {
  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()

  const [searchParams] = useSearchParams()

  const paginationValueInURL = Number(searchParams.get('currentPage')) || currentPageValue

  const { sort, isSuccess, isFetching, data } = useGetDataSort()

  const { itemsPerPage, totalItems, totalPages } = data?.pagination ?? {}

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
    utilityForSearchParamsEdit({
      param: 'currentPage',
      valueForNewParam: page.toString() ?? '',
    })
  }

  const handlerSortValue = (sort: Sort) => {
    utilityForSearchParamsEdit({
      param: 'orderBy',
      valueForNewParam:
        sort?.key && sort?.direction !== null ? `${sort?.key}-${sort?.direction}` : [],
    })
  }

  const pagination = !!totalPages && (
    <Pagination
      currentPage={paginationValueInURL}
      pageSize={itemsPerPage ?? 0}
      totalCount={totalItems ?? 0}
      onPageChange={page => handlerPagination(page)}
    />
  )

  return (
    <div className={classNames.container}>
      <div className={classNames.deck}>
        <div className={classNames.head}>
          <Typography variant={'large'}>Packs list</Typography>
          <Button>Add new pack</Button>
        </div>
        <DecksPanel />
        <div className={classNames.tableWrapper}>
          <Table.Root>
            <Table.Header columns={columnsDecks} sort={sort} onSort={handlerSortValue} />
            {
              <Table.Body>
                {data?.items.length ? (
                  <SortedDataDeck />
                ) : (
                  data?.items !== undefined && <RenderNoDataDeck />
                )}
              </Table.Body>
            }
          </Table.Root>
        </div>
      </div>
      <div className={classNames.pagination}>
        {!isFetching && isSuccess && (totalPages || 1) >= 1 && pagination}
        <DeckItemsPerPage />
      </div>
    </div>
  )
})
