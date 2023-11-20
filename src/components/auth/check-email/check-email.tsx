import { NavLink } from 'react-router-dom'

import s from './check-email.module.scss'

import { Email } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

type Props = {
  email: string
}

export const CheckEmail = ({ email }: Props) => {
  return (
    <>
      <Card className={s.card}>
        <Typography variant="large" className={s.title}>
          Check Email
        </Typography>
        <div className={s.iconContainer}>
          <Email />
        </div>
        <Typography variant="body2" className={s.instructions}>
          We`ve sent an e-mail with instructions to {email}
        </Typography>
        <Button fullWidth={true} as={NavLink} to={'/login'}>
          Back to Sign in
        </Button>
      </Card>
    </>
  )
}
