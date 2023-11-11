import { useEffect, useState } from 'react'

import { Navigate, Outlet, useSearchParams } from 'react-router-dom'

import s from './layout.module.scss'

import { Header } from '@/components/header'
import { Loader } from '@/components/ui/loader'
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button/scroll-to-top-button.tsx'
import {
  useAppDispatch,
  useAppSelector,
  useGetAuthUserMeDataQuery,
  useLogoutUserMutation,
} from '@/service'
import { searchParamsQuery } from '@/service/store/deckParamsSlice.ts'

export const Layout = () => {
  const classNames = {
    container: s.container,
  }

  ////!!!!!!!!!!!!
  // const [search, setSearch] = useSearchParams()
  // const dispatch = useAppDispatch() ///!!!!!!
  // const queryState = useAppSelector(state => state.deckReducer.searchParamsQuery)
  //
  // // console.log('queryState1', queryState)
  // const { isSuccess: isAuthenticated, isLoading, data, isFetching } = useGetAuthUserMeDataQuery()
  //
  // useEffect(() => {
  //   if (search.toString().length) {
  //     dispatch(searchParamsQuery({ searchParamsQuery: search.toString() })) ///!!!!!!
  //     // setSearch(search)
  //     // console.log('dispatch, setSearch')
  //     // newSearch = search
  //     // setSearch(newSearch)
  //   }
  //   // setSearch(newSearch)
  //   setSearch(queryState)
  // }, [isAuthenticated])
  // // console.log('privatRouter', search.toString())
  // // console.log('queryState2', queryState)

  ////!!!!!!!!!!!!
  // const { path } = useParams() ///!!!!

  // const [searchParams] = useSearchParams() ///!!!!
  //
  // console.log('path', path) ///!!!!
  // const currentParams = Object.fromEntries([...searchParams]) ///!!!!
  //
  // console.log(`?${new URLSearchParams(currentParams).toString()}`) ///!!!!

  const { isSuccess: isAuthenticated, isLoading, data } = useGetAuthUserMeDataQuery()

  const [getLogOut] = useLogoutUserMutation()

  // if (isLoading) {
  //   return <Loader />
  // } //!!!!!!!!!!

  // const [authMe, setAuthMe] = useState(false)
  //
  // // // const { isSuccess: isAuthenticated, isLoading, data, isFetching } = useGetAuthUserMeDataQuery()
  // //
  // useEffect(() => {
  //   if (!authMe) {
  //     setAuthMe(true)
  //     // console.log('authMe1', authMe)
  //   }
  // }, [authMe])
  // useEffect(() => {
  //   setAuthMe(prevState => {
  //     if (!prevState) {
  //       // console.log('authMe1', !prevState)
  //
  //       return true
  //     }
  //
  //     return prevState
  //   })
  // }, [])
  //
  // // console.log('authMe2', authMe)
  //
  // // const [getLogOut] = useLogoutUserMutation()
  //
  // if ((isLoading || isFetching) && !authMe) {
  //   return <Loader />
  // }
  // console.log('isLoading', isLoading)
  console.log('layout', isAuthenticated)

  return (
    <>
      <div className={classNames.container}>
        {isLoading && <Loader />}
        <Header
          isAuth={isAuthenticated}
          user={data === null ? undefined : data}
          onSignOut={getLogOut}
        />
        <Outlet />
        <ScrollToTopButton />
      </div>
    </>
  )

  // return (
  //   <div className={classNames.container}>
  //     {isLoading && <Loader />}
  //     <Header
  //       isAuth={isAuthenticated}
  //       user={data === null ? undefined : data}
  //       onSignOut={getLogOut}
  //     />
  //     <Outlet />
  //     <ScrollToTopButton />
  //   </div>
  // )
}
