import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './button.tsx'

import { Logout } from '@/assets/icons'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    href: 'https://sass-lang.com/',
    fullWidth: false,
  },
  argTypes: {
    onClick: {
      action: 'clicked',
    },
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link'],
      control: { type: 'select' },
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    ref: { control: { type: 'select' } },
    as: { options: ['button', 'a'], control: { type: 'radio' } },
    className: { control: 'text' },
    href: {
      control: 'text',
      if: { arg: 'as', eq: 'a' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button Primary',
    disabled: false,
    as: 'button',
    loading: false,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: false,
    as: 'button',
  },
}
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
    disabled: false,
    as: 'button',
  },
}
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link-button',
    as: 'a',
    href: 'https://webref.ru/',
    disabled: false,
  },
}

export const ButtonWithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Logout />
        <div>Button Primary</div>
      </>
    ),
    disabled: false,
    as: 'button',
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
    as: 'button',
  },
}

export const LoadingButton: Story = {
  args: {
    variant: 'primary',
    disabled: false,
    as: 'button',
    loading: true,
    children: (
      <>
        <div>Button Primary</div>
      </>
    ),
  },
}
export const AsLink: Story = {
  args: {
    variant: 'primary',
    children: 'Link that looks like a button',
    as: 'a',
    href: 'https://sass-lang.com',
  },
}
