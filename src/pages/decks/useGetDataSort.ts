import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { Sort } from '@/components/ui/tables'
import { useCombineAppSelector } from '@/pages/decks/useCombineAppSelector.ts'
import { useQueryString } from '@/pages/decks/useQueryString.ts'
import {
  useAppDispatch,
  useAppSelector,
  useGetAuthUserMeDataQuery,
  useGetDecksQuery,
} from '@/service'
import { searchParamsQuery } from '@/service/store/deckParamsSlice.ts'
import { useIsFirstRender } from '@/utils'

export const useGetDataSort = () => {
  // const queryRedirect = useAppSelector(state => state.deckReducer.searchParamsQuery) ///!!!!! в комбайн

  const { isSuccess: isAuthenticated } = useGetAuthUserMeDataQuery() ///!!!! Удалить

  console.log('isAuthenticated', isAuthenticated)

  const {
    currentPage,
    itemsPerPage,
    minMaxCardsCount,
    myOrAllAuthorCards,
    findName,
    orderBy,
    queryRedirect,
  } = useCombineAppSelector()

  const dispatch = useAppDispatch() ////!!!!

  const [searchParams, setSearchParams] = useSearchParams() ///!!!!!

  console.log('searchParams', searchParams.toString())
  console.log('queryRedirect', queryRedirect)

  const queryString = useQueryString({
    currentPage,
    itemsPerPage,
    minMaxCardsCount,
    myOrAllAuthorCards,
    findName,
    orderBy,
  })

  // console.log('queryString', queryString)
  ////!!!!!!!!!! Доделать диспатчи для сохранения при ручном обновлении
  // useEffect(() => {
  //   const queryUrl = searchParams.toString()
  //
  //   if (!queryUrl) return
  //
  //   const { currentPage, itemsPerPage, name, orderBy, minCardsCount, maxCardsCount, authorId } =
  //     Object.fromEntries(searchParams)
  //
  //   console.log(
  //     'searchQueryParse',
  //     currentPage,
  //     itemsPerPage,
  //     name,
  //     orderBy,
  //     minCardsCount,
  //     maxCardsCount,
  //     authorId
  //   )

  // authorId && dispatch() //!!! диспатчить значения в слайс
  // }, [])
  ////!!!!!!!!!!

  // const isFirstRender = useIsFirstRender()
  //
  // useEffect(() => {
  //   if (isFirstRender) {
  //     if (queryRedirect) {
  //       setSearchParams(queryRedirect)
  //     }
  //   } else {
  //     setSearchParams(queryString)
  //   }
  // }, [queryString, searchParams])

  // useLayoutEffect(() => {
  //   setSearchParams(queryString)
  //   // console.log(queryString)
  //   dispatch(searchParamsQuery({ searchParamsQuery: queryString })) ///!!!!!! вернуть если диспатчить из private router
  // }, [queryString]) ///!!!!!! вернуть закомментированное в useEffect если диспатчить из private router

  // useEffect(() => {
  //   setSearchParams(queryString)
  //   // console.log(queryString)
  //   dispatch(searchParamsQuery({ searchParamsQuery: queryString })) ///!!!!!! вернуть если диспатчить из private router
  // }, [queryString]) ///!!!!!! вернуть закомментированное в useEffect если диспатчить из private router

  const isFirstRender = useIsFirstRender()

  useEffect(() => {
    if (isFirstRender) {
      return
    }
    setSearchParams(queryString)
    // console.log(queryString)
    dispatch(searchParamsQuery({ searchParamsQuery: queryString })) ///!!!!!! вернуть если диспатчить из private router
  }, [queryString]) ///!!!!!! вернуть закомментированное в useEffect если диспатчить из private router

  const query = () =>
    searchParams.toString().length ? `${searchParams.toString()}` : queryRedirect || queryString ///!!!!!!!!!!!

  const resultQuery = query()
  // const query = searchParams.toString().length ? `${searchParams.toString()}` : queryString ///!!!!!!!!!!!
  ///!!!!!! вернуть закомментированное const query = searchParams.toString().length ? `${searchParams.toString()}` : queryString если диспатчить из private router

  console.log('query', resultQuery)
  // const query = queryRedirect || queryString ///!!!!!!!!!!! если в private router let за компонентом

  // console.log('query', query)
  // const { data, isSuccess, isLoading, isFetching } = useGetDecksQuery(queryString)
  const { data, isSuccess, isLoading, isFetching } = useGetDecksQuery(resultQuery) ///???????????????

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

  // console.log('query', query)
  console.log('sortedData ', sortedData)
  console.log('useGetDataSort')

  return { sort, setSort, isSuccess, sortedData, isLoading, data, currentPage, isFetching }
}
