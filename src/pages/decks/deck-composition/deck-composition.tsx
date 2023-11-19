import { memo, useMemo } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './../decks.module.scss'

import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { Sort, Table } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import { columns } from '@/pages/decks/constantsDeck.ts'
import { DeckRow } from '@/pages/decks/deck-row/deck-row.tsx'
import { DecksPanel } from '@/pages/decks/decks-panel/decks-panel.tsx'
import { useGetDataSort } from '@/pages/decks/hooks-and-functions/useGetDataSort.ts'
import { currentPageValue, sortTableReducer, useAppDispatch } from '@/service'
import { currentPageReducer } from '@/service/store/deckParamsSlice.ts'
import { useIsFirstRender, useUtilityForSearchParamsEdit } from '@/utils'

export const DeckComposition = memo(() => {
  const dispatch = useAppDispatch()

  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()

  const [searchParams] = useSearchParams()

  const paginationValueInURL = Number(searchParams.get('currentPage')) || currentPageValue

  const { sort, isSuccess, isFetching, data } = useGetDataSort()

  const isFirstRender = useIsFirstRender()

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
    dispatch(currentPageReducer({ currentPage: page }))
    utilityForSearchParamsEdit({
      param: 'currentPage',
      valueForNewParam: page.toString() ?? '',
    })
  }

  const handlerSortValue = (sort: Sort) => {
    dispatch(sortTableReducer({ sortTable: sort }))

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
  const renderNoData = () => (
    <tr className={s.td}>
      <td colSpan={5}>
        <p className={s.textNoData}>Упс... данные отсутствуют</p>
      </td>
    </tr>
  )

  const sortedDataOrNothing = useMemo(
    () =>
      (!!data?.items.length && data?.items.map(deck => <DeckRow key={deck.id} {...deck} />)) ||
      (!data?.items.length && !isFirstRender && renderNoData()),
    [data]
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
            <Table.Header columns={columns} sort={sort} onSort={handlerSortValue} />
            {<Table.Body>{sortedDataOrNothing}</Table.Body>}
          </Table.Root>
        </div>
      </div>
      <div className={classNames.pagination}>
        {!isFetching && isSuccess && (totalPages || 1) > 1 && pagination}
      </div>
    </div>
  )
})
