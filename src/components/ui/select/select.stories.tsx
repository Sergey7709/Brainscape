import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '@/components/ui/select/select.tsx'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    options: [
      { title: 'Option 1', value: '1' },
      { title: 'Option 2', value: '2' },
      { title: 'Option 3', value: '3' },
    ],
    label: 'This is a select',
    placeholder: 'Select an option',
  },
}

export const Disabled: Story = {
  args: {
    options: [
      { title: 'Option 1', value: '1' },
      { title: 'Option 2', value: '2' },
      { title: 'Option 3', value: '3' },
    ],
    label: 'This is a disabled select',
    placeholder: 'Select an option',
    disabled: true,
  },
}
