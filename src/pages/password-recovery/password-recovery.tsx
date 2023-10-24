import { useNavigate } from 'react-router-dom'

import s from './password-recovery.module.scss'

import { ForgotPassword } from '@/components/auth/forgot-password'
import { useRecoverPasswordEmailMutation } from '@/service'
import { PasswordRecoveryEmailRequest } from '@/service/auth/auth.types.ts'

export const PasswordRecovery = () => {
  const [recoverPasswordEmail] = useRecoverPasswordEmailMutation()

  const navigate = useNavigate()
  const handleSubmitRecoveryPassword = async (data: PasswordRecoveryEmailRequest) => {
    await recoverPasswordEmail(data).unwrap()

    try {
      console.log(data)
      navigate('/check-email', { state: data.email }) ///!!!!!!! Правильно ли передаю данные?
    } catch (error: any) {
      ///!!!!!!!!!!!!!! уточнить тип
      console.log(error.data.message)
    } ///!!!!!!!!!!!!!! заменить лог
  }

  return (
    <div className={s.passwordRecovery}>
      <ForgotPassword onSubmit={handleSubmitRecoveryPassword} />
    </div>
  )
}
