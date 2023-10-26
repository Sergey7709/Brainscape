import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from '@/components/layout'
import { Decks } from '@/pages/decks/decks.tsx'
import { Error404 } from '@/pages/Error404'
import { Login } from '@/pages/login'
import { Registration } from '@/pages/registration'
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
    element: <div>check email</div>,
  },
  {
    path: '/create-password',
    element: <div>create password</div>,
  },
  {
    path: '/forgot-password',
    element: <div>forgot password</div>,
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
    element: <Decks />,
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
