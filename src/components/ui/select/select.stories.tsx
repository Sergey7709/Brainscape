import type { Meta, StoryObj } from '@storybook/react'

import { CustomSelect } from '@/components/ui/select/select.tsx'

const meta = {
  title: 'Components/Select',
  component: CustomSelect,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'night',
      values: [
        {
          name: 'night',
          value: '#000',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            height: '1000px',
          },
        },
      }, // newViewports would be an ViewportMap. (see below for examples)
      defaultViewport: 'Mobile',
    },
  },
} satisfies Meta<typeof CustomSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
    placeholder: 'Select an option',
  },
}
