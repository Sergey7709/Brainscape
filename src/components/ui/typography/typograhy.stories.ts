import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from "@/components/ui/typography/typography.tsx";

const meta = {
    title: 'Components/Typography',
    component: Typography,
    tags: ['autodocs'],
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        variant: 'large',
        as: 'span',
        children: 'This is a large text'
    }
}



