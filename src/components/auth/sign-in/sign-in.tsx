import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { z } from 'zod'

import s from './sign-in.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/check-box'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

export const signInSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .trim()
    .email('Please enter a valid email')
    .nonempty('Please enter a valid email'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .trim()
    .min(3, 'Password  is too short')
    .max(30, 'Password  is too long')
    .nonempty('Please enter a valid password'),
  rememberMe: z.boolean().optional(),
})

export type SignInForm = z.infer<typeof signInSchema>
export type SignInProps = {
  onHandleSubmit: (form: SignInForm) => void
}

export const SignIn = ({ onHandleSubmit }: SignInProps) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  })

  const {
    field: { value, onChange },
  } = useController({
    name: 'rememberMe',
    control,
    defaultValue: false,
  })
  const onHandleSubmitForm = handleSubmit((form: SignInForm) => {
    onHandleSubmit(form)
  })

  return (
    <Card>
      <Typography variant={'large'} className={s.signInTypography}>
        Sign In
      </Typography>
      <form onSubmit={onHandleSubmitForm}>
        <div className={s.signInTextField}>
          <TextField
            label={'Email'}
            {...register('email')}
            errorMessage={errors.email?.message}
          ></TextField>
          <TextField
            label={'Password'}
            type={'password'}
            {...register('password')}
            errorMessage={errors.password?.message}
          ></TextField>
        </div>
        <div className={s.signInCheckboxWrapper}>
          <Checkbox label={'Remember me'} checked={value} onChange={onChange} />
        </div>
        <Typography
          as={NavLink}
          to={'/ForgotPassword'}
          variant={'body2'}
          className={s.signInForgotPassword}
        >
          Forgot Password?
        </Typography>
        <div className={s.signInButton}>
          <Button variant={'primary'} fullWidth>
            Sign In
          </Button>
        </div>
      </form>
      <Typography>{`Don't have an account?`}</Typography>
      <Typography as={NavLink} to={'/signUp'} variant={'body1'} className={s.signInLink}>
        Sign Up
      </Typography>
    </Card>
  )
}
