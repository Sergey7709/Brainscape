import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { SignUp, SignUpForm } from '@/components/auth/sign-up/sign-up.tsx'

const meta = {
  title: 'Auth/SignUp',
  component: SignUp,
  tags: ['autodocs'],
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => {
    const onSubmitHandler = (data: SignUpForm) => {
      console.log(data)
    }

    return (
      <BrowserRouter>
        <SignUp onSubmitHandler={onSubmitHandler} />
      </BrowserRouter>
    )
  },
}
