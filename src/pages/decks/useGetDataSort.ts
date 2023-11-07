import { useMemo, useState } from 'react'

import { Sort } from '@/components/ui/tables'
import { useCombineAppSelector } from '@/pages/decks/useCombineAppSelector.ts'
import { useQueryString } from '@/pages/decks/useQueryString.ts'
import {
  authorCardsIDAbsent,
  itemsPerPageValue,
  maxCardsValue,
  minCardsValue,
  useGetDecksQuery,
} from '@/service'

export const useGetDataSort = () => {
  const { currentPage, itemsPerPage, minMaxCardsCount, myOrAllAuthorCards } =
    useCombineAppSelector()

  const queryString = useQueryString({
    currentPage,
    itemsPerPage,
    minMaxCardsCount,
    myOrAllAuthorCards,
  })

  console.log('itemsPerPage', itemsPerPage)
  console.log('currentPage', currentPage)
  // const queryString = [
  //   currentPage !== currentPage ? `currentPage=${currentPage}` : '',
  //   itemsPerPage !== itemsPerPageValue ? `itemsPerPage=${itemsPerPage}` : '',
  //   minMaxCardsCount[0] !== minCardsValue ? `minCardsCount=${minMaxCardsCount[0]}` : '',
  //   minMaxCardsCount[1] !== maxCardsValue ? `maxCardsCount=${minMaxCardsCount[1]}` : '',
  //   myOrAllAuthorCards !== authorCardsIDAbsent ? `authorId=${myOrAllAuthorCards}` : '',
  // ]
  //   .filter(el => !!el)
  //   .join('&') //!!!!!!!! Вынести в useCombineAppSelector

  console.log('queryString', queryString)

  const { data, isSuccess, isLoading } = useGetDecksQuery(queryString)

  //////

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

  return { sort, setSort, isSuccess, sortedData, isLoading, data, currentPage }
}
