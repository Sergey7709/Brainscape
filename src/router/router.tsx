import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'

import { Layout } from '@/components/layout'
import { Charts } from '@/pages/charts/Charts.tsx'
import { CreateNewPassword } from '@/pages/create-new-password'
import { Decks } from '@/pages/decks/decks.tsx'
import { Error404 } from '@/pages/Error404'
import { GreetingNonAuthorized } from '@/pages/home'
import { GreetingAuthorized } from '@/pages/home/greetingAuthorized.tsx'
import { Learn } from '@/pages/learn'
import { Login } from '@/pages/login'
import { Pack } from '@/pages/pack'
import { PasswordRecovery } from '@/pages/password-recovery'
import { Profile } from '@/pages/profile'
import { Registration } from '@/pages/registration'
import { VerifyEmail } from '@/pages/verify-email'
import {
  chartsPath,
  createNewPasswordPath,
  decksPath,
  error404Path,
  greetingNonAuthorizedPath,
  learnPath,
  loginPath,
  packPath,
  passwordRecoveryPath,
  profilePath,
  registrationPath,
  rootElementPath,
  verifyEmailPath,
} from '@/router/constantsRouter.ts'
import { PrivateRoutes } from '@/router/privateRoutes.tsx'

const publicRoutes: RouteObject[] = [
  {
    path: greetingNonAuthorizedPath,
    element: <GreetingNonAuthorized />,
  },
  {
    path: loginPath,
    element: <Login />,
  },
  {
    path: registrationPath,
    element: <Registration />,
  },
  {
    path: verifyEmailPath,
    element: <VerifyEmail />,
  },
  {
    path: createNewPasswordPath,
    element: <CreateNewPassword />,
  },
  {
    path: passwordRecoveryPath,
    element: <PasswordRecovery />,
  },
  {
    path: error404Path,
    element: <Error404 />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: rootElementPath,
    element: <GreetingAuthorized />,
  },
  {
    path: profilePath,
    element: <Profile />,
  },
  {
    path: decksPath,
    element: <Decks />,
  },
  {
    path: chartsPath,
    element: <Charts />,
  },

  {
    path: packPath,
    element: <Pack />,
  },
  {
    path: learnPath,
    element: <Learn />,
  },
]

const router = createBrowserRouter([
  {
    path: rootElementPath,
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
