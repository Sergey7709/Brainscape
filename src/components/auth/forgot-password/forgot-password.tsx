import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { z } from 'zod'

import s from './forgot-password.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-textfiled/controlled-textfield.tsx'
import { Typography } from '@/components/ui/typography'

const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .nonempty('Enter email')
    .min(3, 'Login must be at least 3 characters'),
})

type FormType = z.infer<typeof ForgotPasswordSchema>

type Props = {
  onSubmit: (data: FormType) => void
}

export const ForgotPassword = (props: Props) => {
  const { control, handleSubmit } = useForm<FormType>({
    mode: 'onSubmit',
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleFormSubmit = handleSubmit(props.onSubmit)

  return (
    <>
      <DevTool control={control} />
      <Card className={s.card}>
        <Typography variant="large" as={'h1'} className={s.title}>
          Forgot your password?
        </Typography>
        <form className={s.form} onSubmit={handleFormSubmit}>
          <ControlledTextField
            className={s.emailInput}
            placeholder={'Email'}
            name={'email'}
            label={'Email'}
            control={control}
          />
          <Typography variant="body2" className={s.instructions}>
            Enter your email address and we will send you further instructions
          </Typography>
          <Button className={s.buttonSend} fullWidth type={'submit'}>
            Send Instructions
          </Button>
        </form>
        <Typography variant="body2" className={s.caption}>
          Did you remember your password?
        </Typography>
        <Typography variant="link1" as={NavLink} to={'/login'} className={s.loginLink}>
          Try logging in
        </Typography>
      </Card>
    </>
  )
}
