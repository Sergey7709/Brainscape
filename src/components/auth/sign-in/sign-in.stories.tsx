import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { SignIn } from '@/components/auth/sign-in'

const meta = {
  title: 'Auth/SignIn',
  component: SignIn,
  tags: ['autodocs'],
} satisfies Meta<typeof SignIn>

export default meta

type Story = StoryObj<typeof meta>
export const Cards: Story = {
  render: () => {
    // const handleSubmit = console.log('submit')

    return (
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    )
  },
}
