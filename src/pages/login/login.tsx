import { Navigate } from 'react-router-dom'

import s from './login.module.scss'

import { SignIn } from '@/components/auth/sign-in'
import { useGetAuthUserMeDataQuery, useSignInUserMutation } from '@/service'

export const Login = () => {
  const [signInUser] = useSignInUserMutation()

  const { isSuccess: isAuthenticated } = useGetAuthUserMeDataQuery()

  if (isAuthenticated) return <Navigate to={'/'} replace={true} />

  return (
    <div className={s.login}>
      <SignIn onHandleSubmit={signInUser} />
    </div>
  )
}
