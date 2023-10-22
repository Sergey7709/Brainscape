import { Outlet } from 'react-router-dom'

import s from './layout.module.scss'

import { Header } from '@/components/header'
import { useLogoutUserMutation } from '@/service'

export const Layout = () => {
  const classNames = {
    container: s.container,
  }

  const [getLogOut] = useLogoutUserMutation()

  return (
    <div className={classNames.container}>
      <Header isAuth={true} user={{ name: 'ivan', email: 'test' }} onSignOut={getLogOut} />
      <Outlet />
    </div>
  )
}
