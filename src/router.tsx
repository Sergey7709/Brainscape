import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from '@/components/layout/layout.tsx'
import { Error404 } from '@/pages/Error404/error404.tsx'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>sign in</div>,
  },
  {
    path: '/sign-up',
    element: <div>sign up</div>,
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
    element: <div>decks</div>,
  },
]

function PrivateRoutes() {
  const isAuthenticated = true

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
