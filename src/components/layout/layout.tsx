import { Outlet, useNavigate } from 'react-router-dom'

import s from './layout.module.scss'

import { Header } from '@/components/header'
import { LoaderSquare } from '@/components/ui/loader-square'
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button/scroll-to-top-button.tsx'
import { greetingNonAuthorizedPath } from '@/router'
import { useGetAuthUserMeDataQuery, useLogoutUserMutation } from '@/service'

export const Layout = () => {
  const classNames = {
    container: s.container,
  }

  const { isSuccess: isAuthenticated, isLoading, data } = useGetAuthUserMeDataQuery()

  const [getLogOut] = useLogoutUserMutation()

  const navigate = useNavigate()

  const logOut = () => {
    getLogOut()
    navigate(greetingNonAuthorizedPath)
  }

  return (
    <>
      <div className={classNames.container}>
        {isLoading && <LoaderSquare />}
        <Header
          isAuth={isAuthenticated}
          user={data === null ? undefined : data}
          onSignOut={logOut}
        />
        <Outlet />
        <ScrollToTopButton />
      </div>
    </>
  )
}
