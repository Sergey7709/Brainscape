import type { Meta, StoryObj } from '@storybook/react'

import { Email } from '@/assets/icons'
import s from '@/components/auth/check-email/check-email.module.scss'
import { CheckEmail } from '@/components/auth/check-email/check-email.tsx'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

const meta = {
  title: 'Auth/checkEmail',
  component: CheckEmail,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    email: 'hhhahhd@gmail.com',
  },
  render: args => (
    <Card className={s.card}>
      <Typography variant="large" className={s.title}>
        Check Email
      </Typography>
      <div className={s.iconContainer}>
        <Email />
      </div>
      <Typography variant="body2" className={s.instructions}>
        sent an e-mail with instructions to {args.email}
      </Typography>
      <Button fullWidth={true} as={'button'}>
        Back to Sign in
      </Button>
    </Card>
  ),
}
