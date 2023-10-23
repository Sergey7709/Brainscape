import s from './registration.module.scss'

import { SignUp } from '@/components/auth/sign-up'
import { useSignUpUserMutation } from '@/service'

export const Registration = () => {
  const [getSignUp] = useSignUpUserMutation()

  return (
    <div className={s.signUp}>
      <SignUp onSubmitHandler={getSignUp} />
    </div>
  )
}
