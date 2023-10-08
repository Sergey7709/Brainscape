import { useState } from 'react'

import s from './sign-in.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/check-box'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

export const SignIn = () => {
  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = () => {
    setChecked(!checked)
  }

  return (
    <Card className={s.signInDivContainer}>
      <Typography variant={'large'} className={s.signInTypography}>
        Sign In
      </Typography>
      <div className={s.signInTextField}>
        <TextField label={'Email'}></TextField>
        <TextField label={'Password'} type={'password'}></TextField>
      </div>
      <div className={s.signInCheckboxWrapper}>
        <Checkbox checked={checked} label={'Remember me'} onChange={handleCheckboxChange} />
      </div>
      <div className={s.signInForgotPassword}>
        <Button variant={'link'}>Forgot Password?</Button>
      </div>
      <div className={s.signInButton}>
        <Button variant={'primary'} fullWidth>
          Sign In
        </Button>
      </div>
      <Typography>{`Don't have an account?`}</Typography>
      <div className={s.signInLink}>
        <Button variant={'link'}>Sign Up</Button>
      </div>
    </Card>
  )
}
