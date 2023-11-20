import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from '@/components/auth/check-email/check-email.tsx'

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
}
