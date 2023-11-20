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
  email: z.string().trim().nonempty('Email is required').email('Please enter a valid email'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .trim()
    .nonempty('Password is required')
    .min(3, 'Password must be at least 3 characters')
    .max(30),

  rememberMe: z.boolean().optional(),
})

export type SignInForm = z.infer<typeof signInSchema>
export type SignInProps = {
  onHandleSubmit: (form: SignInForm) => void
  loading?: boolean
  disabled?: boolean
}

const initialValues: SignInForm = {
  email: '',
  password: '',
  rememberMe: false,
}

export const SignIn = ({ onHandleSubmit, loading = false, disabled = false }: SignInProps) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(signInSchema),
    defaultValues: initialValues,
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
        <div className={s.signInForgotPasswordContainer}>
          <Typography
            as={NavLink}
            to={'/forgot-password'}
            variant={'body2'}
            className={s.signInForgotPassword}
          >
            Forgot Password?
          </Typography>
        </div>
        <div className={s.signInButton}>
          <Button variant={'primary'} loading={loading} disabled={disabled} fullWidth>
            Sign In
          </Button>
        </div>
      </form>
      <Typography>{`Don't have an account?`}</Typography>
      <Typography as={NavLink} to={'/sign-up'} variant={'body1'} className={s.signInLink}>
        Sign Up
      </Typography>
    </Card>
  )
}
