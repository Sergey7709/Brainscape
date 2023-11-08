import { useMemo, useState } from 'react'

import { Sort } from '@/components/ui/tables'
import { useCombineAppSelector } from '@/pages/decks/useCombineAppSelector.ts'
import { useQueryString } from '@/pages/decks/useQueryString.ts'
import { useGetDecksQuery } from '@/service'

export const useGetDataSort = () => {
  const { currentPage, itemsPerPage, minMaxCardsCount, myOrAllAuthorCards, findName } =
    useCombineAppSelector()

  const queryString = useQueryString({
    currentPage,
    itemsPerPage,
    minMaxCardsCount,
    myOrAllAuthorCards,
    findName,
  })

  // console.log('itemsPerPage', itemsPerPage)
  console.log('currentPage', currentPage)
  // console.log('queryString', queryString)

  const { data, isSuccess, isLoading, isFetching } = useGetDecksQuery(queryString)

  // console.log('Load', isLoading, 'fetch', isFetching)

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
