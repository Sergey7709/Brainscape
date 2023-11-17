import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import Home from '../pages/home/home.tsx'

import { Layout } from '@/components/layout'
import { CreateNewPassword } from '@/pages/create-new-password'
import { Decks } from '@/pages/decks/decks.tsx'
import { Error404 } from '@/pages/Error404'
import { Login } from '@/pages/login'
import { PasswordRecovery } from '@/pages/password-recovery'
import { Profile } from '@/pages/profile'
import { Registration } from '@/pages/registration'
import { VerifyEmail } from '@/pages/verify-email'
import { PrivateRoutes } from '@/router/privateRoutes.tsx'

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  }, ///!!!!!!!!!!!!!!!!!!!!!! доделать роут
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
  // {
  //   path: '/',
  //   element: <Home />,
  // },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/deck',
    element: <Decks />,
  },
]

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
