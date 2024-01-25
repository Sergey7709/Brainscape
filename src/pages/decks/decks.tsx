import { clsx } from 'clsx'
import { useSearchParams } from 'react-router-dom'

import { Loader } from '@/components/ui/loader'
import { LoaderSquare } from '@/components/ui/loader-square'
import { Pagination } from '@/components/ui/pagination'
import { Sort } from '@/components/ui/tables'
import { Typography } from '@/components/ui/typography'
import { DeckAddNewPack } from '@/pages/decks/deck-addNewPack'
import { DeckTable } from '@/pages/decks/deck-table'
import { DeckItemsPerPage } from '@/pages/decks/deckItemsPerPage'
import { DecksPanel } from '@/pages/decks/decks-panel'
import s from '@/pages/decks/decks.module.scss'
import { useGetDataSort } from '@/pages/decks/hooks-and-functions'
import { currentPageValue } from '@/service'
import { useUtilityForSearchParamsEdit } from '@/utils'
import { orderBy } from '@/utils/constants/constantsForSearchParams.ts'

export const Decks = () => {
  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()

  const [searchParams] = useSearchParams()

  const paginationValueInURL = Number(searchParams.get('currentPage')) || currentPageValue

  const { sort, isFetching, isLoading, data } = useGetDataSort()

  const { itemsPerPage, totalItems, totalPages } = data?.pagination ?? {}

  window.scrollTo(0, 0)

  const classNames = {
    container: clsx(s.container, (isLoading || isFetching) && s.containerDisabled),
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
      param: orderBy,
      valueForNewParam:
        sort?.key && sort?.direction !== null ? `${sort?.key}-${sort?.direction}` : [],
    })
  }

  const conditionalRenderLoaderDeck = isFetching || isLoading

  const conditionalRenderDeck = !!data && !!sort

  return (
    <>
      {conditionalRenderLoaderDeck && !conditionalRenderDeck && <LoaderSquare />}
      {conditionalRenderLoaderDeck && conditionalRenderDeck && <Loader />}
      {conditionalRenderDeck && (
        <div className={classNames.container}>
          <div className={classNames.deck}>
            <div className={classNames.head}>
              <Typography className={s.title}>Packs list</Typography>
              <DeckAddNewPack />
            </div>
            <DecksPanel maxCardsCount={data.maxCardsCount} />
            <DeckTable handlerSortValue={handlerSortValue} />
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
                <DeckItemsPerPage />
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
