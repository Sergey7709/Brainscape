import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from './textField'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    onValueChange: {
      control: { type: '-' },
      description: 'Handler called when the controlled value changes.',
    },
    value: {
      control: { type: '-' },
      description:
        'Controlled value of a text field. Should ONLY be used in conjunction with onValueChange.',
    },
    type: {
      control: { type: 'radio' },
      description:
        'Controlled value of a text field. Must be used in conjunction with onValueChange.',
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#313131',
        },
      ],
    },
    docs: {
      description: {
        component:
          'The component can be used as both uncontrolled and controlled (requires properties: value and onValueChange).',
      },
    },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    type: 'search',
  },
}

export const Password: Story = {
  args: {
    label: 'Label',
    placeholder: 'Password',
    type: 'password',
  },
}

export const Error: Story = {
  args: {
    label: 'Input with error',
    value: 'Wrong value',
    errorMessage: 'Error message',
  },
}

export const Search: Story = {
  args: {
    label: 'Search Input',
    type: 'search',
    placeholder: 'Input',
  },
}
