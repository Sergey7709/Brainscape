import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export const Layout = () => {
  return (
    <>
      <Header isAuth={true} user={{ name: 'ivan', email: 'test' }} />
      <Outlet />
    </>
  )
}
