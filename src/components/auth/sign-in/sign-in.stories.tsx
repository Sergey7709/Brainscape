import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { SignIn, SinInForm } from '@/components/auth/sign-in'

const meta = {
  title: 'Auth/SignIn',
  component: SignIn,
  tags: ['autodocs'],
} satisfies Meta<typeof SignIn>

export default meta

type Story = StoryObj<typeof meta>
export const Cards: Story = {
  render: () => {
    const onSubmitHandler = (form: SinInForm) => console.log(form)

    return (
      <BrowserRouter>
        <SignIn onHandleSubmit={onSubmitHandler} />
      </BrowserRouter>
    )
  },
}
