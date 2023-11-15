import { Loader } from '@/components/ui/loader'
import { DeckComposition } from '@/pages/decks/deck-composition/deck-composition.tsx'
import { utilitySearchParams } from '@/pages/decks/hooks-and-functions/utilitySearchParams.ts'
import { useGetDecksQuery } from '@/service'

export const Decks = () => {
  const { isLoading, isFetching } = useGetDecksQuery(utilitySearchParams())

  console.log('Deck')
  // const [searchParams, setSearchParams] = useSearchParams()
  //
  // const dispatch = useAppDispatch() ////!!!!!!!!!!!!! удалить
  //
  // const { data: meData } = useGetAuthUserMeDataQuery()
  // const meID = meData?.id
  //
  // const { sort, setSort, sortedData, isSuccess, isLoading, data, currentPage, isFetching } =
  //   useGetDataSort()
  //
  // const { itemsPerPage, totalItems, totalPages } = data?.pagination ?? {}
  //
  // const classNames = {
  //   container: s.container,
  //   decksPanel: s.decksPanel,
  //   searchInput: s.searchInput,
  //   slider: s.slider,
  //   tableWrapper: s.tableWrapper,
  //   head: s.head,
  //   deck: s.deck,
  //   pagination: s.paginationWrapper,
  // }
  //
  // const handlerPagination = (page: number) => {
  //   dispatch(currentPageReducer({ currentPage: page }))
  //   utilityForSearchParamsEdit({
  //     searchParams,
  //     setSearchParams,
  //     param: 'currentPage',
  //     valueForNewParam: page.toString() ?? '',
  //   })
  // }
  //
  // const handlerTabSwitchChangeValue = () => {
  //   utilityForSearchParamsEdit({
  //     searchParams,
  //     setSearchParams,
  //     param: 'authorId',
  //     valueForNewParam: meID ?? '',
  //   })
  // }
  //
  // const handlerSortValue = (sort: Sort) => {
  //   setSort(sort)
  //   sort?.key && sort?.direction !== undefined
  //     ? utilityForSearchParamsEdit({
  //         searchParams,
  //         setSearchParams,
  //         param: 'orderBy',
  //         valueForNewParam: `${sort?.key}-${sort?.direction}`,
  //       })
  //     : utilityForSearchParamsEdit({
  //         searchParams,
  //         setSearchParams,
  //         param: 'orderBy',
  //         valueForNewParam: '',
  //       })
  // }
  //
  // const pagination = !!totalPages && (
  //   <Pagination
  //     currentPage={currentPage}
  //     pageSize={itemsPerPage ?? 0}
  //     totalCount={totalItems ?? 0}
  //     onPageChange={page => handlerPagination(page)}
  //   />
  // )
  //
  // const sortedDataOrnNothing =
  //   isSuccess && sortedData.length ? (
  //     sortedData.map(deck => <DeckRow key={deck.id} {...deck} />)
  //   ) : (
  //     <div className={s.noData}>
  //       <p className={s.textNoData}>Упс... данные отсутствуют</p>
  //     </div>
  //   )
  //
  // if (isLoading || isFetching) {
  //   return <Loader />
  // } //!!!
  //
  // console.log('Deck load', 'Deck return JSX')

  // return <>{isLoading || isFetching ? <Loader /> : <DeckComposition />}</>
  ///!!!! Исправить загрузку и debounce!
  return (
    <>
      {isLoading || (isFetching && <Loader />)}
      <DeckComposition />
    </>
  )
}
