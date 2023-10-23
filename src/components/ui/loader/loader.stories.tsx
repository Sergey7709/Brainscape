import { Meta, StoryObj } from '@storybook/react'

import { Loader } from '@/components/ui/loader/loader.tsx'

const meta = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'This component does not take any properties. The width is set to 100%. The position is fixed, z-index: 9999.\n',
      },
    },
  },
} satisfies Meta<typeof Loader>

export default meta

type Story = StoryObj<typeof meta>

export const Cards: Story = {
  render: () => <Loader />,
}
