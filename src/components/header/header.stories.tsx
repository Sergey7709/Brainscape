import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import avatar from '@/assets/images/test.png'
import { Header } from '@/components/header/header.tsx'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    return (
      <BrowserRouter>
        <Header {...args} />
      </BrowserRouter>
    )
  },

  args: {
    isAuth: true,
    user: {
      name: 'Ivan',
      email: 'test@gmail.com',
      avatar: avatar,
    },
  },
}
