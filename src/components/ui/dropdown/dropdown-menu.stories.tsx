import type { Meta, StoryObj } from '@storybook/react'

import { DropdownMenu } from '@/components/ui/dropdown/dropdown-menu.tsx'

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
