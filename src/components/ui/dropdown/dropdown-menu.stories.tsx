import type { Meta, Story } from '@storybook/react'

import { Eye } from '@/assets/icons'
import test from '@/assets/images/test.png'
import {
  DropDownItem,
  DropDownItemWithIcon,
  DropdownMenu,
} from '@/components/ui/dropdown/dropdown-menu.tsx'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/stories/Button.tsx'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: { type: 'radio' },
      options: ['start', 'center', 'end'],
    },
    sideOffset: {
      control: { type: 'number' },
      defaultValue: 8,
      description: 'Margin top for dropdown content',
    },
  },
}

export default meta

export const Default: Story = args => {
  return (
    <DropdownMenu
      {...args}
      trigger={<img style={{ display: 'block', margin: '0 auto' }} src={test} alt={'icon'} />}
    >
      <DropDownItem>
        <img src={test} alt={'icon'} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>Ivan</Typography>
          <Typography variant={'caption'} style={{ color: '#808080' }}>
            email@gmail.com
          </Typography>
        </div>
      </DropDownItem>
      <DropDownItemWithIcon textValue={'Value one'} icon={<Eye />} />
      <DropDownItemWithIcon textValue={'Value two'} icon={<Eye />} />
    </DropdownMenu>
  )
}

export const WithDisabledItems: Story = args => {
  return (
    <DropdownMenu
      {...args}
      sideOffset={20}
      trigger={
        <span>
          <Button primary label={'Click me!'} />
        </span>
      }
    >
      <DropDownItem disabled>
        <img src={test} alt={'icon'} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>Ivan</Typography>
          <Typography variant={'caption'} style={{ color: '#808080' }}>
            email@gmail.com
          </Typography>
        </div>
      </DropDownItem>
      <DropDownItemWithIcon textValue={'Value'} icon={<Eye />} />
      <DropDownItemWithIcon disabled textValue={'Disabled value'} icon={<Eye />} />
    </DropdownMenu>
  )
}
