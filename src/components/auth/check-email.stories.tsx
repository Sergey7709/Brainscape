import type { Meta, StoryObj } from '@storybook/react'

import { checkEmail } from '@/components/auth/check-email.tsx'

const meta = {
  title: 'Auth/checkEmail',
  component: checkEmail,
  tags: ['autodocs'],
} satisfies Meta<typeof checkEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
