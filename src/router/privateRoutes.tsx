import { memo } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { LoaderSquare } from '@/components/ui/loader-square'
import { greetingNonAuthorizedPath } from '@/router/constantsRouter.ts'
import { useGetAuthUserMeDataQuery } from '@/service'

export const PrivateRoutes = memo(() => {
  const { isSuccess: isAuthenticated, isLoading } = useGetAuthUserMeDataQuery()

  if (isLoading) {
    return <LoaderSquare />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={greetingNonAuthorizedPath} />
})
