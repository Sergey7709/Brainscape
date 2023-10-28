import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { z } from 'zod'

import s from './sign-up.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

const signUpSchema = z
  .object({
    email: z.string().trim().email(),
    password: z.string().trim().min(3).max(30),
    confirmPassword: z.string().trim(),
    name: z.string().trim().min(3).max(30).optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignUpForm = z.infer<typeof signUpSchema>

type Props = { onSubmitHandler: (data: SignUpForm) => void }
export const SignUp = ({ onSubmitHandler }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  })

  const classNames = {
    wrapper: s.wrapper,
    button: s.button,
    question: s.question,
    link: s.link,
    form: s.form,
  }

  return (
    <Card className={classNames.wrapper}>
      <Typography variant={'large'}>Sign Up</Typography>
      <form className={classNames.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField errorMessage={errors.email?.message} {...register('email')} label={'Email*'} />
        <TextField errorMessage={errors.name?.message} {...register('name')} label={'Name'} />
        <TextField
          errorMessage={errors.password?.message}
          {...register('password')}
          label={'Password*'}
          type={'password'}
        />
        <TextField
          errorMessage={errors.confirmPassword?.message}
          {...register('confirmPassword')}
          type={'password'}
          label={'Confirm password*'}
        />
        <Button className={classNames.button} fullWidth={true}>
          Sign Up
        </Button>
      </form>
      <Typography variant={'body2'} className={classNames.question}>
        Already have an account?
      </Typography>
      <Typography className={classNames.link} as={NavLink} to={'/login'} variant={'link1'}>
        Sign In
      </Typography>
    </Card>
  )
}
