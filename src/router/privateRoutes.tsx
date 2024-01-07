import { memo } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { Loader } from '@/components/ui/loader'
import { useGetAuthUserMeDataQuery } from '@/service'

export const PrivateRoutes = memo(() => {
  const { isSuccess: isAuthenticated, isLoading } = useGetAuthUserMeDataQuery()

  if (isLoading) {
    return <Loader />
  }

  console.log('privatRouter JSX')

  return isAuthenticated ? <Outlet /> : <Navigate to="/greeting" />
})
