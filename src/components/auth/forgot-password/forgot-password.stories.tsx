import type { Meta, StoryObj } from '@storybook/react'

import s from './forgot-password.module.scss'
import { ForgotPassword } from './forgot-password.tsx'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

const meta = {
  title: 'Auth/ForgotPassword',
  component: ForgotPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => (
    <>
      <Card className={s.card}>
        <Typography variant="large" as={'h1'} className={s.title}>
          Forgot your password?
        </Typography>
        <form className={s.form}>
          <Typography variant="body2" className={s.instructions}>
            Enter your email address and we will send you further instructions
          </Typography>
          <Button className={s.buttonSend} fullWidth type={'button'}>
            Send Instructions
          </Button>
        </form>
        <Typography variant="body2" className={s.caption}>
          Did you remember your password?
        </Typography>
        <Typography variant="link1" as={'a'} className={s.loginLink}>
          Try logging in
        </Typography>
      </Card>
    </>
  ),
}
