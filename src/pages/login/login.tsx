import { Navigate } from 'react-router-dom'

import s from './login.module.scss'

import { SignIn } from '@/components/auth/sign-in'
import { rootElementPath } from '@/router'
import { useGetAuthUserMeDataQuery, useSignInUserMutation } from '@/service'

export const Login = () => {
  const [signInUser] = useSignInUserMutation()

  const { isSuccess: isAuthenticated, isError } = useGetAuthUserMeDataQuery()

  return (
    <div className={s.login}>
      {isAuthenticated && <Navigate to={rootElementPath} replace={true} />}
      {isError && <SignIn onHandleSubmit={signInUser} />}
    </div>
  )
}
