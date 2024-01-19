import { useSearchParams } from 'react-router-dom'

import { Loader } from '@/components/ui/loader'
import { Pagination } from '@/components/ui/pagination'
import { Sort, Table } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import { columnsDecks } from '@/pages/decks/constantsDeck.ts'
import { DeckAddNewPack } from '@/pages/decks/deck-addNewPack'
import { DeckItemsPerPage } from '@/pages/decks/deckItemsPerPage'
import { DecksPanel } from '@/pages/decks/decks-panel'
import s from '@/pages/decks/decks.module.scss'
import { useGetDataSort } from '@/pages/decks/hooks-and-functions'
import { RenderNoDataDeck } from '@/pages/decks/renderNoDataDeck'
import { SortedDataDeck } from '@/pages/decks/sortedDataDeck'
import { currentPageValue } from '@/service'
import { useUtilityForSearchParamsEdit } from '@/utils'

export const Decks = () => {
  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()

  const [searchParams] = useSearchParams()

  const paginationValueInURL = Number(searchParams.get('currentPage')) || currentPageValue

  const { sort, isFetching, isLoading, data } = useGetDataSort()

  const { itemsPerPage, totalItems, totalPages } = data?.pagination ?? {}

  window.scrollTo(0, 0)

  const classNames = {
    container: s.container,
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

  return (
    <>
      {(isFetching || isLoading) && <Loader />}
      {data && sort && (
        <div className={classNames.container}>
          <div className={classNames.deck}>
            <div className={classNames.head}>
              <Typography className={s.title}>Packs list</Typography>
              <DeckAddNewPack />
            </div>
            <DecksPanel maxCardsCount={data.maxCardsCount} />
            <div className={classNames.tableWrapper}>
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
                <Table.Body>
                  {data?.items.length ? (
                    <SortedDataDeck />
                  ) : (
                    data?.items !== undefined && <RenderNoDataDeck />
                  )}
                </Table.Body>
              </Table.Root>
            </div>
          </div>
          <div className={classNames.pagination}>
            {(totalPages || 1) && (
              <>
                <Pagination
                  currentPage={paginationValueInURL}
                  pageSize={itemsPerPage ?? 0}
                  totalCount={totalItems ?? 0}
                  onPageChange={page => handlerPagination(page)}
                />
                {<DeckItemsPerPage />}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
