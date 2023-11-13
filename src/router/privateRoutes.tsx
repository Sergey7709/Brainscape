import { memo, useEffect, useLayoutEffect } from 'react'

import { Navigate, Outlet, useSearchParams } from 'react-router-dom'

import { Loader } from '@/components/ui/loader'
import { useAppDispatch, useAppSelector, useGetAuthUserMeDataQuery } from '@/service'
import { searchParamsQuery } from '@/service/store/deckParamsSlice.ts'

// let newSearch = {}

export const PrivateRoutes = memo(() => {
  // console.log('privatRouter start')
  // const [search, setSearch] = useSearchParams()
  // const dispatch = useAppDispatch() ///!!!!!!
  // const queryState = useAppSelector(state => state.deckReducer.searchParamsQuery)
  //
  const { isSuccess: isAuthenticated, isLoading } = useGetAuthUserMeDataQuery()

  // useEffect(() => {
  //   if (search.toString().length) {
  //     dispatch(searchParamsQuery({ searchParamsQuery: search.toString() })) ///!!!!!!
  //   }
  //
  //   setSearch(queryState)
  //   // }, [isAuthenticated])  ///!!! было
  // }, [search])

  // useLayoutEffect(() => {
  //   if (search.toString().length) {
  //     dispatch(searchParamsQuery({ searchParamsQuery: search.toString() })) ///!!!!!!
  //   }
  //
  //   setSearch(queryState)
  // }, [search]) ////!!!!
  //
  if (isLoading) {
    return <Loader />
  } //!!!!!!!!!!

  console.log('privatRouter JSX')
  // console.log('search.toString()', search.toString())

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
})
