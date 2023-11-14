import { useSearchParams } from 'react-router-dom'

import { useCombineAppSelector } from '@/pages/decks/useCombineAppSelector.ts'
import { useDataSort } from '@/pages/decks/useDataSort.ts'
import { useGetDecksQuery } from '@/service'

export const useGetDataSort = () => {
  const { currentPage } = useCombineAppSelector()

  const [searchParams] = useSearchParams()

  const resultQuery = `${searchParams.toString()}`

  console.log('resultQuery', resultQuery)

  const { data, isSuccess, isLoading, isFetching } = useGetDecksQuery(resultQuery)

  const { sortedData, setSort, sort } = useDataSort({ data, isSuccess })

  console.log(
    'data',
    data,
    'sortedData',
    sortedData,
    'isLoading',
    isLoading,
    'isFetching',
    isFetching,
    'isSuccess',
    isSuccess
  )

  return { sort, setSort, isSuccess, sortedData, isLoading, data, currentPage, isFetching }
}
