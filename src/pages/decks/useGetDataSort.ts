import { useEffect, useLayoutEffect, useMemo, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { Sort } from '@/components/ui/tables'
import { useCombineAppSelector } from '@/pages/decks/useCombineAppSelector.ts'
import { useQueryString } from '@/pages/decks/useQueryString.ts'
import { useAppDispatch, useGetDecksQuery } from '@/service'
import {
  currentPageReducer,
  findNameReducer,
  minMaxCardsCountReducer,
  myOrAllAuthorCardsReducer,
  orderByReducer,
  searchParamsQuery,
} from '@/service/store/deckParamsSlice.ts'
import { useIsFirstRender } from '@/utils'

export const useGetDataSort = () => {
  const {
    currentPage,
    // itemsPerPage,
    // minMaxCardsCount,
    // myOrAllAuthorCards,
    // findName,
    orderBy,
    queryRedirect,
  } = useCombineAppSelector()

  const dispatch = useAppDispatch() ////!!!!

  const [searchParams] = useSearchParams() ///!!!!!

  // const queryString = useQueryString({
  //   currentPage,
  //   itemsPerPage,
  //   minMaxCardsCount,
  //   myOrAllAuthorCards,
  //   findName,
  //   orderBy,
  // })

  ////!!!!!!!!!! Доделать диспатчи для сохранения при ручном обновлении

  // const initialSort = useMemo(() => {
  //   if (!orderBy) return undefined
  //
  //   const [key, direction] = orderBy.split('-')
  //
  //   if (!key || !direction) return undefined
  //
  //   return {
  //     key,
  //     direction,
  //   } as Sort
  // }, [orderBy])
  // const [sort, setSort] = useState<Sort>(initialSort || null)

  // useEffect(() => {
  //   const queryUrl = searchParams.toString()
  //
  //   if (!queryUrl) return
  //
  //   const { currentPage, name, orderBy, minCardsCount, maxCardsCount, authorId } =
  //     Object.fromEntries(searchParams)
  //
  //   // console.log(Object.fromEntries(searchParams))
  //
  //   // console.log(
  //   //   'searchQueryParse',
  //   //   currentPage,
  //   //   itemsPerPage,
  //   //   name,
  //   //   orderBy,
  //   //   minCardsCount,
  //   //   maxCardsCount,
  //   //   authorId
  //   // )
  //   if (orderBy) {
  //     const [key, direction] = orderBy.split('-')
  //     const orderByObj = { key, direction: direction as 'asc' | 'desc' }
  //
  //     orderBy && dispatch(orderByReducer({ orderBy: orderBy }))
  //     orderBy && setSort(orderByObj)
  //   }
  //
  //   currentPage && dispatch(currentPageReducer({ currentPage: Number(currentPage) }))
  //   authorId && dispatch(myOrAllAuthorCardsReducer({ authorCards: authorId }))
  //   name && dispatch(findNameReducer({ findName: name }))
  //   ;(minCardsCount || maxCardsCount) &&
  //     dispatch(
  //       minMaxCardsCountReducer({
  //         minMaxCardsCount: [Number(minCardsCount || 0), Number(maxCardsCount || 100)], ///!!! Исправил 0 на 100 макс
  //       })
  //     )
  // }, [])
  ////!!!!!!!!!! Доделать диспатчи для сохранения при ручном обновлении

  // const isFirstRender = useIsFirstRender()

  // useEffect(() => {
  //   if (isFirstRender) {
  //     return
  //   }
  //   setSearchParams(queryString)
  //   // console.log(queryString)
  //   dispatch(searchParamsQuery({ searchParamsQuery: queryString })) ///!!!!!! вернуть если диспатчить из private router
  // }, [queryString]) ///!!!!!! вернуть закомментированное в useEffect если диспатчить из private router

  // useLayoutEffect(() => {
  //   if (isFirstRender) {
  //     return
  //   }
  //   setSearchParams(queryString)
  //   // console.log(queryString)
  //   // dispatch(searchParamsQuery({ searchParamsQuery: queryString })) ///!!!!!! вернуть если диспатчить из private router
  // }, [queryString]) ///!!!!!! вернуть закомментированное в useEffect если диспатчить из private router

  // console.log('searchParams', searchParams.toString())
  // console.log('queryRedirect', queryRedirect)
  // const query = () =>
  //   searchParams.toString().length ? `${searchParams.toString()}` : queryRedirect || queryString ///!!!!!!!!!!!

  // const resultQuery = query()

  const resultQuery = `${searchParams.toString()}`

  console.log('resultQuery', resultQuery)

  // const query = searchParams.toString().length ? `${searchParams.toString()}` : queryString ///!!!!!!!!!!!
  ///!!!!!! вернуть закомментированное const query = searchParams.toString().length ? `${searchParams.toString()}` : queryString если диспатчить из private router

  // console.log('query', resultQuery)

  const { data, isSuccess, isLoading, isFetching } = useGetDecksQuery(resultQuery) ///???????????????

  // const initialSort = useMemo(() => {
  //   if (!orderBy) return undefined
  //
  //   const [key, direction] = orderBy.split('-')
  //
  //   if (!key || !direction) return undefined
  //
  //   return {
  //     key,
  //     direction,
  //   } as Sort
  // }, [orderBy]) ///!!!!! исходная позиция
  // console.log('initialSort', initialSort)
  // const [sort, setSort] = useState<Sort>(initialSort || null) ///!!!!! исходная позиция

  const initialSort = useMemo(() => {
    if (!orderBy) return undefined

    const [key, direction] = orderBy.split('-')

    if (!key || !direction) return undefined

    return {
      key,
      direction,
    } as Sort
  }, [orderBy])
  const [sort, setSort] = useState<Sort>(initialSort || null)

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

  // console.log('query', query)console.log('sortedData ', sortedData)
  // console.log('sortedData', sortedData)
  // console.log('useGetDataSort')
  // console.log(
  //   'searchQueryParsew',
  //   currentPage,
  //   // itemsPerPage,
  //   // name,
  //   orderBy
  //   // minCardsCount,
  //   // maxCardsCount,
  //   // authorId
  // )

  // return { sort, setSort, isSuccess, sortedData, isLoading, data, currentPage, isFetching }
  return { sort, setSort, isSuccess, sortedData, isLoading, data, currentPage, isFetching }
}
