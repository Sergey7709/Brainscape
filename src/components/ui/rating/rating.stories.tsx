import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Rating } from '@/components/ui/rating/rating.tsx'

const meta = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

export const Primal: Story = {
  render: args => {
    const [rating, setRating] = useState(0)

    const onChangeHandler = (value: number) => {
      setRating(value)
    }

    return <Rating {...args} value={rating} onChangeValue={onChangeHandler} />
  },
  args: {
    count: 5,
  },
}
