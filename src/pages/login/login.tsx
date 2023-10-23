import { Navigate } from 'react-router-dom'

import s from './login.module.scss'

import { SignIn } from '@/components/auth/sign-in'
import { useGetAuthUserMeDataQuery, useSignInUserMutation } from '@/service'

export const Login = () => {
  const [signInUser] = useSignInUserMutation()

  const { isSuccess: isAuthenticated, isError } = useGetAuthUserMeDataQuery()

  return (
    <div className={s.login}>
      {isAuthenticated && <Navigate to={'/'} replace={true} />}
      {isError && <SignIn onHandleSubmit={signInUser} />}
    </div>
  )
}
