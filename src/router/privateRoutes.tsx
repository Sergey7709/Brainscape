import { memo, useEffect, useLayoutEffect } from 'react'

import { Navigate, Outlet, useSearchParams } from 'react-router-dom'

import { Loader } from '@/components/ui/loader'
import { useAppDispatch, useAppSelector, useGetAuthUserMeDataQuery } from '@/service'
import { searchParamsQuery } from '@/service/store/deckParamsSlice.ts'

// let newSearch = {}

export const PrivateRoutes = memo(() => {
  console.log('privatRouter start')

  const [search, setSearch] = useSearchParams()
  //
  const dispatch = useAppDispatch() ///!!!!!!
  const queryState = useAppSelector(state => state.deckReducer.searchParamsQuery)

  //
  // console.log('queryState1', queryState)
  // console.log('privatRouter', search.toString())

  const { isSuccess: isAuthenticated, isLoading } = useGetAuthUserMeDataQuery()

  useEffect(() => {
    if (search.toString().length) {
      dispatch(searchParamsQuery({ searchParamsQuery: search.toString() })) ///!!!!!!
      // setSearch(search)
      // console.log('dispatch, setSearch')
      // newSearch = search
      // setSearch(newSearch)
    }
    // setSearch(newSearch)
    setSearch(queryState)
  }, [isAuthenticated])
  // console.log('privatRouter', search.toString())
  // console.log('queryState2', queryState)
  // console.log('privatRouter')
  // if (isLoading) {
  //   return <Loader />
  // } //!!!!!!!!!!
  console.log('privatRouter JSX')

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
})
