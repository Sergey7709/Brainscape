import { useParams, useSearchParams } from 'react-router-dom'

import { useDataSort } from '@/pages/decks/hooks-and-functions/useDataSort.ts'
import { utilitySearchParams } from '@/pages/decks/hooks-and-functions/utilitySearchParams.ts'
import {
  currentPageValue,
  useGetAuthUserMeDataQuery,
  useGetDeckByIdCardsQuery,
  useGetDeckByIdQuery,
} from '@/service'
import { currentPageParams } from '@/utils/constants/constantsForSearchParams.ts'

export const useGetDataForPack = () => {
  const packId = useParams()

  const {
    isSuccess: isAuthenticated,
    isLoading: isLoadingAuth,
    data: dataMeId,
  } = useGetAuthUserMeDataQuery()

  const {
    data: dataDeck,
    isSuccess: isSuccessDeck,
    isLoading: isLoadingDeck,
    isFetching: isFetchingDeck,
  } = useGetDeckByIdQuery(packId.id ?? '')

  const {
    data: dataCards,
    isSuccess: isSuccessCards,
    isLoading: isLoadingCards,
    isFetching: isFetchingCards,
  } = useGetDeckByIdCardsQuery({ id: packId.id ?? '', query: utilitySearchParams() })

  const { itemsPerPage, totalItems, totalPages } = dataCards?.pagination ?? {}

  const [searchParams] = useSearchParams()

  const paginationValueInURL = Number(searchParams.get(currentPageParams)) || currentPageValue

  const { sort } = useDataSort()

  const mePackCards = dataMeId?.id === dataDeck?.userId

  return {
    isAuthenticated,
    isLoadingAuth,
    dataMeId,
    dataDeck,
    isLoadingDeck,
    isFetchingDeck,
    isSuccessDeck,
    dataCards,
    isLoadingCards,
    isFetchingCards,
    isSuccessCards,
    itemsPerPage,
    totalItems,
    totalPages,
    paginationValueInURL,
    sort,
    mePackCards,
  }
}
