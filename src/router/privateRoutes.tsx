import { memo } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { Loader } from '@/components/ui/loader'
import { greetingNonAuthorizedPath } from '@/router/constantsRouter.ts'
import { useGetAuthUserMeDataQuery } from '@/service'

export const PrivateRoutes = memo(() => {
  const { isSuccess: isAuthenticated, isLoading } = useGetAuthUserMeDataQuery()

  if (isLoading) {
    return <Loader />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={greetingNonAuthorizedPath} />
})
