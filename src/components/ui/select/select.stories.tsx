import { useState } from 'react'

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
    options: ['Option 1', 'Option 2', 'Option 3'],
    label: 'This is a select',
    placeholder: 'Select an option',
  },
  render: ({ options, label, placeholder }) => {
    const [value, setValue] = useState('')

    const handlerSelect = (newValue: string) => {
      setValue(newValue)
    }

    return (
      <Select
        value={value}
        onValueChange={handlerSelect}
        options={options}
        label={label}
        placeholder={placeholder}
      />
    )
  },
}

export const Controlled: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
  render: ({ options }) => {
    const [value, setValue] = useState('Option 1')

    const handlerSelect = (newValue: string) => {
      setValue(newValue)
    }

    return <Select value={value} onValueChange={handlerSelect} options={options} />
  },
}

export const Disabled: Story = {
  args: {
    options: ['10', '20', '30'],
    label: 'This is a disabled select',
    placeholder: 'Select an option',
    disabled: true,
  },
}

export const Pagination: Story = {
  args: {
    options: ['10', '20', '30', '50', '100'],
    variant: 'pagination',
  },
  render: ({ options, variant }) => {
    const [value, setValue] = useState('10')

    const handlerSelect = (newValue: string) => {
      setValue(newValue)
    }

    return (
      <Select value={value} onValueChange={handlerSelect} options={options} variant={variant} />
    )
  },
}
