import { useState } from 'react'

import { NavLink } from 'react-router-dom'

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
    <Card>
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
      <NavLink className={s.signInForgotPassword} to={'/ForgotPassword'}>
        <Typography as={'a'} variant={'body2'}>
          Forgot Password?
        </Typography>
      </NavLink>
      <div className={s.signInButton}>
        <Button variant={'primary'} fullWidth>
          Sign In
        </Button>
      </div>
      <Typography>{`Don't have an account?`}</Typography>
      <NavLink to={'/signUp'}>
        <Typography as={'a'} variant={'link1'} className={s.signInLink}>
          Sign Up
        </Typography>
      </NavLink>
    </Card>
  )
}
