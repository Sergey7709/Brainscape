import { useDataSort } from '@/pages/decks/hooks-and-functions/useDataSort.ts'
import { utilitySearchParams } from '@/pages/decks/hooks-and-functions/utilitySearchParams.ts'
import { useGetDecksQuery } from '@/service'

export const useGetDataSort = () => {
  const { data, isSuccess, isLoading, isFetching } = useGetDecksQuery(utilitySearchParams())
  // const { data, isSuccess, isLoading, isFetching } = useGetDecksQuery(
  //   `${utilitySearchParams()}${'&itemsPerPage=10'}`
  // )

  const { sort } = useDataSort()

  console.log(
    'data',
    data,
    'sortedData',
    // sortedData,
    'isLoading',
    isLoading,
    'isFetching',
    isFetching,
    'isSuccess',
    isSuccess
  )

  return { sort, isSuccess, isLoading, data, isFetching }
}
