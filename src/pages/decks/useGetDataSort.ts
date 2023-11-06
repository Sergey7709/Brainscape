import { useMemo, useState } from 'react'

import { Sort } from '@/components/ui/tables'
import { useCombineAppSelector } from '@/pages/decks/useCombineAppSelector.ts'
import {
  authorCardsIDAbsent,
  itemsPerPageValue,
  maxCardsValue,
  minCardsValue,
  useAppSelector,
  useGetDecksQuery,
} from '@/service'

export const useGetDataSort = () => {
  // const currentPage = useAppSelector(state => state.deckReducer.currentPage)
  // const itemsPerPage = useAppSelector(state => state.deckReducer.itemsPerPage)
  // const minMaxCardsCount = useAppSelector(state => state.deckReducer.minMaxCardsCount)
  // const myOrAllAuthorCards = useAppSelector(state => state.deckReducer.authorCards)

  const { currentPage, itemsPerPage, minMaxCardsCount, myOrAllAuthorCards } =
    useCombineAppSelector()

  console.log('itemsPerPage', itemsPerPage)
  console.log('currentPage', currentPage)

  // const { data, isSuccess, isLoading } = useGetDecksQuery(
  //   `currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&minCardsCount=${minMaxCardsCount[0]}&maxCardsCount=${minMaxCardsCount[1]}&authorId=${myOrAllAuthorCards}`
  // ) //!!!!!!!! Вынести в константу

  const queryString = [
    currentPage ? `currentPage=${currentPage}` : '',
    itemsPerPage !== itemsPerPageValue ? `itemsPerPage=${itemsPerPage}` : '',
    minMaxCardsCount[0] !== minCardsValue ? `minCardsCount=${minMaxCardsCount[0]}` : '',
    minMaxCardsCount[1] !== maxCardsValue ? `maxCardsCount=${minMaxCardsCount[1]}` : '',
    myOrAllAuthorCards !== authorCardsIDAbsent ? `authorId=${myOrAllAuthorCards}` : '',
  ]
    .filter(el => !!el)
    .join('&')

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
