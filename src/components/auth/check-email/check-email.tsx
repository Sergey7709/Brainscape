import s from 'src/components/auth/check-email/check-email.module.scss'

import { Email } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

type Props = {
  email: string
}

export const checkEmail = ({ email }: Props) => {
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
        <Button fullWidth={true} as={'a'} href={''}>
          Back to Sign in
        </Button>
      </Card>
    </>
  )
}
