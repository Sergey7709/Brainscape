import { Outlet } from 'react-router-dom'

import s from './layout.module.scss'

import { Header } from '@/components/header'

export const Layout = () => {
  const classNames = {
    container: s.container,
  }

  return (
    <div className={classNames.container}>
      <Header isAuth={true} user={{ name: 'ivan', email: 'test' }} />
      <Outlet />
    </div>
  )
}
