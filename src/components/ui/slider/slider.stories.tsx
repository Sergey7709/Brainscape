import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './slider.tsx'

import s from '@/pages/decks/decks-panel/decks-panel.module.scss'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    onValueCommit: {
      description:
        'Event handler called when the value changes at the end of an interaction. Useful when you only need to capture a final value e.g. to update a backend service.',
    },
    onValueChange: {
      description: 'Event handler called when the value changes.',
    },
    value: {
      description:
        'The controlled value of the slider. Must be used in conjunction with onValueChange.',
    },
    min: { description: 'The minimum value for the range.' },
    max: { description: 'The maximum value for the range.' },
    asChild: {
      description:
        'Change the default rendered element for the one passed as a child, merging their props and behavior.',
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
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    label: 'Number of cards',
    value: [0, 100],
  },

  render: args => {
    const [valueForSlider, setValueForSlider] = useState<number[]>([0, 100])
    const handleOnValueChange = (value: number[]) => {
      console.log('valueSliderChange', value)
      setValueForSlider(value)
    }
    const handlerSliderChangeValue = (value: number[]) => {
      console.log('valueSliderCommit', value)
    }

    return (
      <Slider
        className={s.slider}
        label={args.label}
        min={args.min}
        max={args.max}
        onValueCommit={handlerSliderChangeValue}
        value={valueForSlider}
        onValueChange={handleOnValueChange}
      />
    )
  },
}

export const OneThumb: Story = {
  render: () => {
    const [valueForSlider, setValueForSlider] = useState<number[]>([0])
    const handleOnValueChange = (value: number[]) => {
      console.log('valueSliderChange', value)
      setValueForSlider(value)
    }
    const handlerSliderChangeValue = (value: number[]) => {
      console.log('valueSliderCommit', value)
    }

    return (
      <Slider
        className={s.slider}
        label={'Number of cards'}
        min={0}
        max={100}
        onValueCommit={handlerSliderChangeValue}
        value={valueForSlider}
        onValueChange={handleOnValueChange}
      />
    )
  },
}
