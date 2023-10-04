import { useForm } from 'react-hook-form'

import s from './sign-up.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

type SignUpForm = {
  email: string
  password: string
  confirmPassword: string
}

type Props = { submit: (data: SignUpForm) => void }
export const SignUp = ({ submit }: Props) => {
  const { register, handleSubmit } = useForm<SignUpForm>()

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
      <form className={classNames.form} onSubmit={handleSubmit(submit)}>
        <TextField {...register('email')} label={'Email'} />
        <TextField {...register('password')} label={'Password'} type={'password'} />
        <TextField {...register('confirmPassword')} type={'password'} label={'Confirm password'} />
        <Button className={classNames.button} fullWidth={true}>
          Sign Up
        </Button>
      </form>
      <Typography variant={'body2'} className={classNames.question}>
        Already have an account?
      </Typography>
      <Typography className={classNames.link} as={'a'} variant={'link1'}>
        Sign In
      </Typography>
    </Card>
  )
}
