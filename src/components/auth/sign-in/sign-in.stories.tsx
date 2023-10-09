import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { SignIn, SignInForm } from '@/components/auth/sign-in'

const meta = {
  title: 'Auth/SignIn',
  component: SignIn,
  tags: ['autodocs'],
  argTypes: {
    onHandleSubmit: {
      control: { type: 'function' },
      description:
        'SignIn component props, type\n' + '\n onHandleSubmit: (form: SinInForm) => void',
    },
  },
} satisfies Meta<typeof SignIn>

export default meta

type Story = StoryObj<typeof meta>
export const Cards: Story = {
  render: () => {
    const onSubmitHandler = (form: SignInForm) => console.log(form)

    return (
      <BrowserRouter>
        <SignIn onHandleSubmit={onSubmitHandler} />
      </BrowserRouter>
    )
  },
}
