import { useLocation } from 'react-router-dom'

import s from './verify-email.module.scss'

import { CheckEmail } from '@/components/auth/check-email'

export const VerifyEmail = () => {
  const location = useLocation()
  const emailRecoveryPassword = location.state?.toString()

  return (
    <div className={s.verifyEmail}>
      <CheckEmail email={emailRecoveryPassword} />
    </div>
  )
}
