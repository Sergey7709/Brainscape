import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './registration.module.scss'

import { SignUp } from '@/components/auth/sign-up'
import { useSignUpUserMutation } from '@/service'
import { SignUpRequest } from '@/service/auth/auth.types.ts'

export const Registration = () => {
  const [getSignUp] = useSignUpUserMutation()

  const navigate = useNavigate()
  const handleSubmitSignUp = async (data: SignUpRequest) => {
    await getSignUp(data)
      .unwrap()
      .then(() => {
        navigate('/')
      })
      .catch(error => toast.error(error.data.message))
  }

  return (
    <div className={s.signUp}>
      <SignUp onSubmitHandler={handleSubmitSignUp} />
    </div>
  )
}
