import type { Meta, StoryObj } from '@storybook/react'

import { CreatePassword } from './create-password'

const meta = {
  title: 'Auth/createPassword',
  component: CreatePassword,
  tags: ['autodocs'],
} satisfies Meta<typeof CreatePassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
