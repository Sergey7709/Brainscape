import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/components/ui/typography/typography.tsx'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'body1',
        'body2',
        'subtitle1',
        'subtitle2',
        'caption',
        'overline',
        'link1',
        'link2',
        'error',
      ],
      control: { type: 'radio' },
    },
  },
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
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    variant: 'large',
    children: 'This is a large text',
  },
}
export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'This is a h1 text',
  },
}

export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'This is a h2 text',
  },
}

export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'This is a h3 text',
  },
}

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'This is a body1 text',
  },
}

export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    children: 'This is a subtitle1 text',
  },
}

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'This is a body2 text',
  },
}

export const Subtitle2: Story = {
  args: {
    variant: 'subtitle2',
    children: 'This is a subtitle2 text',
  },
}

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'This is a caption text',
  },
}

export const Overline: Story = {
  args: {
    variant: 'overline',
    children: 'This is a overline text',
  },
}

export const Link1: Story = {
  args: {
    variant: 'link1',
    children: 'This is a link 1 text',
    as: 'a',
  },
}

export const Link2: Story = {
  args: {
    variant: 'link2',
    href: 'https://google.com',
    children: 'This is a link 2 text',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    href: 'https://google.com',
    children: 'This is a Error text',
  },
}
