import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '@/components/ui/select/select.tsx'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label of the select',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    variant: {
      control: ['common', 'pagination'],
      description: 'The variant of the select',
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder of the select',
    },
    onValueChange: {
      control: 'function',
      description: 'Option selected handler',
    },
    className: {
      control: 'text',
      description: 'Common styles of the select',
    },
  },
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

export const Pagination: Story = {
  args: {
    options: [
      { title: '10', value: '10' },
      { title: '20', value: '20' },
      { title: '30', value: '30' },
      { title: '100', value: '100' },
    ],
    variant: 'pagination',
  },
}
