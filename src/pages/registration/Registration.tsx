import { SignUp } from '@/components/auth/sign-up'
import { useSignUpUserMutation } from '@/service'

export const Registration = () => {
  const [getSignUp] = useSignUpUserMutation()

  return <SignUp onSubmitHandler={getSignUp} />
}
