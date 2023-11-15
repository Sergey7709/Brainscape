import { memo } from 'react'

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
import { sortTableReducer, useAppDispatch } from '@/service'
import { currentPageReducer } from '@/service/store/deckParamsSlice.ts'
import { useCombineAppSelector, utilityForSearchParamsEdit } from '@/utils'

export const DeckComposition = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { currentPage } = useCombineAppSelector()

  const dispatch = useAppDispatch() ////!!!!!!!!!!!!! удалить

  // const { data: meData } = useGetAuthUserMeDataQuery()
  // const meID = meData?.id

  const { sort, sortedData, isSuccess, data } = useGetDataSort()

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
      searchParams,
      setSearchParams,
      param: 'currentPage',
      valueForNewParam: page.toString() ?? '',
    })
  }

  const handlerSortValue = (sort: Sort) => {
    // setSort(sort)
    console.log('sort', sort)
    dispatch(sortTableReducer({ sortTable: sort })) ///!!!!!!
    // sort?.key && sort?.direction !== undefined
    //   ? utilityForSearchParamsEdit({
    //       searchParams,
    //       setSearchParams,
    //       param: 'orderBy',
    //       valueForNewParam: `${sort?.key}-${sort?.direction}`,
    //     })
    //   : utilityForSearchParamsEdit({
    //       searchParams,
    //       setSearchParams,
    //       param: 'orderBy',
    //       valueForNewParam: '',
    //     })

    utilityForSearchParamsEdit({
      searchParams,
      setSearchParams,
      param: 'orderBy',
      valueForNewParam:
        sort?.key && sort?.direction !== null ? `${sort?.key}-${sort?.direction}` : [],
    })
  }

  const pagination = !!totalPages && (
    <Pagination
      currentPage={currentPage}
      pageSize={itemsPerPage ?? 0}
      totalCount={totalItems ?? 0}
      onPageChange={page => handlerPagination(page)}
    />
  )

  const sortedDataOrnNothing =
    isSuccess && sortedData.length ? (
      sortedData.map(deck => <DeckRow key={deck.id} {...deck} />)
    ) : (
      <tr>
        <td className={s.td} colSpan={5}>
          <p className={s.textNoData}>Упс... данные отсутствуют</p>
        </td>
      </tr>
    ) ///!!!! Переделать т.к. вылазит во время загрузке

  return (
    <div className={classNames.container}>
      <div className={classNames.deck}>
        <div className={classNames.head}>
          <Typography variant={'large'}>Packs list</Typography>
          <Button>Add new pack</Button>
        </div>
        {/*<DecksPanel setSort={setSort} />*/}
        <DecksPanel />
        <div className={classNames.tableWrapper}>
          <Table.Root>
            <Table.Header columns={columns} sort={sort} onSort={handlerSortValue} />
            <Table.Body>{sortedDataOrnNothing}</Table.Body>
          </Table.Root>
        </div>
      </div>
      <div className={classNames.pagination}>{pagination}</div>
    </div>
  )
})
