import { useLocation, useNavigate } from 'react-router-dom'

import s from './create-new-password.module.scss'

import { CreatePassword } from '@/components/auth/create-password'
import { useResetUserPasswordMutation } from '@/service'

export const CreateNewPassword = () => {
  const [resetUserPassword] = useResetUserPasswordMutation()

  const location = useLocation()

  const navigate = useNavigate()
  const handlerSubmitCreatePassword = async (data: { password: string }) => {
    const url = location.pathname
    const tokenCut = url.split('/')
    const token = tokenCut[tokenCut.length - 1].trim().toString()

    const dataForNewPassword = {
      password: { password: data.password },
      token,
    }

    await resetUserPassword(dataForNewPassword)
      .unwrap()
      .then(() => {
        navigate('/')
      })
      .catch(error => {
        if (error.status === 404) {
          console.log('Request error! 404 User not found!')
        } else if (error.status === 400) {
          console.log('Request error! 400 Email has already been verified!')
        }
      })
  }

  return (
    <div className={s.createNewPassword}>
      <CreatePassword onSubmit={handlerSubmitCreatePassword} />
    </div>
  )
}
