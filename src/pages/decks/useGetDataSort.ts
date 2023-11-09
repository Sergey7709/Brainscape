import { useEffect, useMemo, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { Sort } from '@/components/ui/tables'
import { useCombineAppSelector } from '@/pages/decks/useCombineAppSelector.ts'
import { useQueryString } from '@/pages/decks/useQueryString.ts'
import { useGetDecksQuery } from '@/service'

export const useGetDataSort = () => {
  const { currentPage, itemsPerPage, minMaxCardsCount, myOrAllAuthorCards, findName, orderBy } =
    useCombineAppSelector()

  const [searchParams, setSearchParams] = useSearchParams() ///!!!!!

  const queryString = useQueryString({
    currentPage,
    itemsPerPage,
    minMaxCardsCount,
    myOrAllAuthorCards,
    findName,
    orderBy,
  })

  useEffect(() => {
    setSearchParams(queryString)
    // console.log(`?${searchParams.toString()}`)
    // console.log('searchParams', searchParams)
    // console.log('queryString', queryString)
  }, [queryString]) ///!!!!!

  // console.log('queryString', queryString)
  // console.log(`searchParams?${searchParams.toString()}`)

  const query = Object.keys(Object.fromEntries(searchParams)).length
    ? `${searchParams.toString()}`
    : queryString ///!!!!!!!!!!!

  console.log('query', query)
  // const { data, isSuccess, isLoading, isFetching } = useGetDecksQuery(queryString)
  const { data, isSuccess, isLoading, isFetching } = useGetDecksQuery(query) ///???????????????

  const [sort, setSort] = useState<Sort>(null)

  const sortString: string = `${sort?.key}-${sort?.direction}`

  const sortedData = useMemo(() => {
    if (isSuccess && data.items) {
      if (sort) {
        return [...data.items].sort((a, b) => {
          const [key, direction] = sortString.split('-')
          const isAsc = direction === 'asc'

          const aValue = a[key as keyof typeof a]
          const bValue = b[key as keyof typeof b]

          const result = aValue > bValue ? 1 : -1

          return isAsc ? result : -result
        })
      } else {
        return data.items
      }
    } else {
      return []
    }
  }, [sortString, data, isSuccess])

  return { sort, setSort, isSuccess, sortedData, isLoading, data, currentPage, isFetching }
}
