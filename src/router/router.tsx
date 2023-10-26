import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from '@/components/layout'
import { CreateNewPassword } from '@/pages/create-new-password'
import { Error404 } from '@/pages/Error404'
import { Login } from '@/pages/login'
import { PasswordRecovery } from '@/pages/password-recovery'
import { Registration } from '@/pages/registration'
import { VerifyEmail } from '@/pages/verify-email'
import { useGetAuthUserMeDataQuery } from '@/service'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-up',
    element: <Registration />,
  },
  {
    path: '/check-email',
    element: <VerifyEmail />,
  },
  {
    path: '/confirm-email/:token',
    element: <CreateNewPassword />,
  },
  {
    path: '/forgot-password',
    element: <PasswordRecovery />,
  },
  {
    path: '/*',
    element: <Error404 />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/profile',
    element: <div>profile</div>,
  },
  {
    path: '/',
    element: <div>decks</div>,
  },
]

function PrivateRoutes() {
  const { isSuccess: isAuthenticated } = useGetAuthUserMeDataQuery()

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      ...publicRoutes,
    ],
  },
])

export const Router = () => <RouterProvider router={router} />
