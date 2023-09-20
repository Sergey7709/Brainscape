import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './button.tsx'
import { IconLogout } from './iconLogout.tsx'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      action: 'clicked',
    },
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button Primary ',
    disabled: false,
    as: 'button',
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
    disabled: false,
    as: 'a',
    href: 'https://webref.ru/',
  },
}

export const ButtonWithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <IconLogout />
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
export const AsLink: Story = {
  args: {
    variant: 'primary',
    children: 'Link that looks like a button',
    disabled: false,
    as: 'a',
    href: 'https://sass-lang.com',
  },
}
