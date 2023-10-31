import { Navigate, Outlet } from 'react-router-dom'

import { useGetAuthUserMeDataQuery } from '@/service'

export const PrivateRoutes = () => {
  const { isSuccess: isAuthenticated } = useGetAuthUserMeDataQuery()

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
