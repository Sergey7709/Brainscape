import { useEffect } from 'react'

import { Navigate, Outlet, useSearchParams } from 'react-router-dom'

import { useGetAuthUserMeDataQuery } from '@/service'

let searchParams = {} ///!!!!!!

export const PrivateRoutes = () => {
  const [search, setSearch] = useSearchParams() ///!!!!!!

  const { isSuccess: isAuthenticated } = useGetAuthUserMeDataQuery()

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
      searchParams = search ///!!!!!!
      // console.log('search', search)
      // console.log(search.toString())
    }
    setSearch(searchParams)
  }, []) ///!!!!!!

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
