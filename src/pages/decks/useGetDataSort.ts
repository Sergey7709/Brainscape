import { useEffect, useMemo, useRef, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { Sort } from '@/components/ui/tables'
import { useCombineAppSelector } from '@/pages/decks/useCombineAppSelector.ts'
import { useQueryString } from '@/pages/decks/useQueryString.ts'
import { useAppDispatch, useAppSelector, useGetDecksQuery } from '@/service'
import { searchParamsQuery } from '@/service/store/deckParamsSlice.ts'

export const useGetDataSort = () => {
  // const queryRedirect = useAppSelector(state => state.deckReducer.searchParamsQuery) ///!!!!! в комбайн

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

  const queryString = useQueryString({
    currentPage,
    itemsPerPage,
    minMaxCardsCount,
    myOrAllAuthorCards,
    findName,
    orderBy,
  })
  ////!!!!!!!!!! Доделать диспатчи для сохранения при ручном обновлении
  // useEffect(() => {
  //   const queryString = searchParams.toString()
  //
  //   if (!queryString) return
  //
  //   const { currentPage, itemsPerPage, name, orderBy, minCardsCount, maxCardsCount, authorId } =
  //     Object.fromEntries(searchParams)
  //
  //   authorId && dispatch() //!!! диспатчить значения в слайс
  // }, [])
  ////!!!!!!!!!!

  useEffect(() => {
    setSearchParams(queryString) /////??????????
    // dispatch(searchParamsQuery({ searchParamsQuery: '' })) ///!!!!!!
  }, [queryString]) ///!!!!!

  useEffect(() => {
    if (queryRedirect) {
      setSearchParams(queryRedirect)
    } else {
      setSearchParams(queryString)
    }
  }, []) ///!!!!!

  // const query = Object.keys(Object.fromEntries(searchParams)).length
  //   ? `${searchParams.toString()}`
  //   : queryString ///!!!!!!!!!!!
  // console.log('queryRedirect ', queryRedirect)

  const query = queryRedirect ? queryRedirect : queryString ///!!!!!!!!!!!

  console.log('query', query)
  // const { data, isSuccess, isLoading, isFetching } = useGetDecksQuery(queryString)
  const { data, isSuccess, isLoading, isFetching } = useGetDecksQuery(query) ///???????????????

  const intSort = useMemo(() => {
    if (!orderBy) return undefined

    const [key, direction] = orderBy.split('-')

    if (!key || !direction) return undefined

    return {
      key,
      direction,
    } as Sort
  }, [orderBy])
  const [sort, setSort] = useState<Sort>(intSort || null)

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
