import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './card'

import { Typography } from '@/components/ui/typography'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Cards: Story = {
  args: { children: 'child elements in a card' },
  render: args => (
    <Card className={'top'} {...args}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'center',
          gap: '1rem',
          width: '80%',
          margin: '1rem 0',
        }}
      >
        <Typography variant={'h2'}>Цитата:</Typography>
        <Typography variant={'body1'}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          "Сначала определитесь со своим идеалом: поставьте цель. Потом запаситесь необходимыми
          средствами для её достижения: мудростью, деньгами, методами и материалами. И, наконец,
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          используйте все свои средства для достижения цели."
        </Typography>
        <Typography variant={'body1'}>Аристотель.</Typography>
      </div>
    </Card>
  ),
}
