import { Outlet } from 'react-router-dom'

import s from './layout.module.scss'

import { Header } from '@/components/header'
import { Loader } from '@/components/ui/loader'
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button/scroll-to-top-button.tsx'
import { useGetAuthUserMeDataQuery, useLogoutUserMutation } from '@/service'

export const Layout = () => {
  const classNames = {
    container: s.container,
  }

  const { isSuccess: isAuthenticated, isLoading, data } = useGetAuthUserMeDataQuery()

  const [getLogOut] = useLogoutUserMutation()

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
}
