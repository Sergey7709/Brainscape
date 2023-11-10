import { useEffect } from 'react'

import { Navigate, Outlet, useLocation, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useGetAuthUserMeDataQuery } from '@/service'
import { searchParamsQuery } from '@/service/store/deckParamsSlice.ts'

let searchParams = {} ///!!!!!!

export const PrivateRoutes = () => {
  const [search, setSearch] = useSearchParams()

  const dispatch = useAppDispatch() ///!!!!!!

  const { isSuccess: isAuthenticated } = useGetAuthUserMeDataQuery()
  // const location = useLocation()
  // if (search.toString().length) {
  //   searchParams = search ///!!!!!!
  //   console.log('search', search)
  //   console.log(search.toString())
  // }

  // if (Object.keys(Object.fromEntries(search)).length) {
  //   searchParams = Object.fromEntries(search) ///!!!!!!
  //   // console.log('search', search)
  // }
  //
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     setSearch(searchParams)
  //   }
  // }, [isAuthenticated]) ///!!!!!!

  useEffect(() => {
    if (search.toString().length) {
      // console.log(search.toString())
      // console.log('location.pathname', location.pathname, '+', 'location.search', location.search)

      dispatch(searchParamsQuery({ searchParamsQuery: search.toString() })) ///!!!!!!
    }
    // setSearch(searchParams)
    // setSearch(search)
  }, [isAuthenticated])

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
