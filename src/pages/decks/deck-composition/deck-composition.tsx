import { useSearchParams } from 'react-router-dom'

import s from './../decks.module.scss'

import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { Sort, Table } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import { columns } from '@/pages/decks/constantsDeck.ts'
import { DeckRow } from '@/pages/decks/deck-row/deck-row.tsx'
import { DecksPanel } from '@/pages/decks/decks-panel/decks-panel.tsx'
import { useGetDataSort } from '@/pages/decks/useGetDataSort.ts'
import { useAppDispatch, useGetAuthUserMeDataQuery } from '@/service'
import { currentPageReducer } from '@/service/store/deckParamsSlice.ts'
import { utilityForSearchParamsEdit } from '@/utils'

// type  DeckCompositionProps = {
//     handlerPagination:
// }
export const DeckComposition = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch() ////!!!!!!!!!!!!! удалить

  const { data: meData } = useGetAuthUserMeDataQuery()
  const meID = meData?.id

  const { sort, setSort, sortedData, isSuccess, data, currentPage } = useGetDataSort()

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

  const handlerTabSwitchChangeValue = () => {
    utilityForSearchParamsEdit({
      searchParams,
      setSearchParams,
      param: 'authorId',
      valueForNewParam: meID ?? '',
    })
  }

  const handlerSortValue = (sort: Sort) => {
    setSort(sort)
    sort?.key && sort?.direction !== undefined
      ? utilityForSearchParamsEdit({
          searchParams,
          setSearchParams,
          param: 'orderBy',
          valueForNewParam: `${sort?.key}-${sort?.direction}`,
        })
      : utilityForSearchParamsEdit({
          searchParams,
          setSearchParams,
          param: 'orderBy',
          valueForNewParam: '',
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

  // const sortedDataOrnNothing =
  //   isSuccess && sortedData.length ? (
  //     sortedData.map(deck => <DeckRow key={deck.id} {...deck} />)
  //   ) : (
  //     <div className={s.noData}>
  //       <p className={s.textNoData}>Упс... данные отсутствуют</p>
  //     </div>
  //   )

  return (
    <div className={classNames.container}>
      <div className={classNames.deck}>
        <div className={classNames.head}>
          <Typography variant={'large'}>Packs list</Typography>
          <Button>Add new pack</Button>
        </div>
        <DecksPanel handlerTabSwitchChangeValue={handlerTabSwitchChangeValue} setSort={setSort} />
        <div className={classNames.tableWrapper}>
          <Table.Root>
            <Table.Header columns={columns} sort={sort} onSort={handlerSortValue} />
            <Table.Body>
              {isSuccess && sortedData.length ? (
                sortedData.map(deck => <DeckRow key={deck.id} {...deck} />)
              ) : (
                <div className={s.noData}>
                  <p className={s.textNoData}>Упс... данные отсутствуют</p>
                </div>
              )}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
      <div className={classNames.pagination}>{pagination}</div>
    </div>
  )
}
