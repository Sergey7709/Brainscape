import { useDataSort } from '@/pages/decks/hooks-and-functions/useDataSort.ts'
import { utilitySearchParams } from '@/pages/decks/hooks-and-functions/utilitySearchParams.ts'
import { useGetDecksQuery } from '@/service'

export const useGetDataSort = () => {
  const { data, isSuccess, isLoading, isFetching } = useGetDecksQuery(utilitySearchParams())

  const { sort } = useDataSort()

  return { sort, isSuccess, isLoading, data, isFetching }
}
