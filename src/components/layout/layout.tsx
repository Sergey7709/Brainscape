import { Outlet } from 'react-router-dom'

import s from './layout.module.scss'

import { Header } from '@/components/header'
import { Loader } from '@/components/ui/loader'
import { useGetAuthUserMeDataQuery, useLogoutUserMutation } from '@/service'

export const Layout = () => {
  const classNames = {
    container: s.container,
  }

  console.log('layout')

  const { isSuccess: isAuthenticated, isLoading, data } = useGetAuthUserMeDataQuery()

  const [getLogOut] = useLogoutUserMutation()

  const userData = !!data && {
    name: data.name,
    email: data.email,
    avatar: data.avatar,
  }

  return (
    <div className={classNames.container}>
      {isLoading && <Loader />}
      <Header isAuth={isAuthenticated} user={userData || undefined} onSignOut={getLogOut} />
      <Outlet />
    </div>
  )
}
