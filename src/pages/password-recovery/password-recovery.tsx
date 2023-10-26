import { useNavigate } from 'react-router-dom'

import s from './password-recovery.module.scss'

import { ForgotPassword } from '@/components/auth/forgot-password'
import { useRecoverPasswordEmailMutation } from '@/service'
import { PasswordRecoveryEmailRequest } from '@/service/auth/auth.types.ts'

export const PasswordRecovery = () => {
  const [recoverPasswordEmail] = useRecoverPasswordEmailMutation()

  const navigate = useNavigate()
  const handleSubmitRecoveryPassword = async (data: PasswordRecoveryEmailRequest) => {
    const textRefRecovery = {
      email: data.email,
      html: '<h3>Hi, ##name##</h3><h3>Click <a href="http://localhost:5173/confirm-email/##token##">here</a> to recover your password</h3>',
    }

    await recoverPasswordEmail(textRefRecovery)
      .unwrap()
      .then(() => {
        navigate('/check-email', { state: data.email })
      })
      .catch(error => {
        if (error.status === 404) {
          console.log('Request error! 404 User not found!')
        } else if (error.status === 400) {
          console.log('Request error! 400 Email has already been verified!')
        }
      })

    // try {
    //   console.log(data)
    //   navigate('/check-email', { state: data.email }) ///!!!!!!! Правильно ли передаю данные?
    // } catch (error: any) {
    //   ///!!!!!!!!!!!!!! уточнить тип
    //   console.log(error.data.message)
    // } ///!!!!!!!!!!!!!! заменить лог
  }

  return (
    <div className={s.passwordRecovery}>
      <ForgotPassword onSubmit={handleSubmitRecoveryPassword} />
    </div>
  )
}
