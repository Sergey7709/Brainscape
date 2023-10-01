import type { Meta, StoryObj } from '@storybook/react'

import { Eye } from '@/assets/icons'
import testAva from '@/assets/test-avatar.jpg'
import {
  DropDownItem,
  DropDownItemWithIcon,
  DropdownMenu,
} from '@/components/ui/dropdown/dropdown-menu.tsx'
import { Typography } from '@/components/ui/typography'

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = () => {
  return (
    <DropdownMenu trigger={<img src={testAva} alt={'trigger'} />}>
      <DropDownItem>
        <img src={testAva} alt={'test-avatar'} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>Ivan</Typography>
          <Typography variant={'caption'} style={{ color: '#808080' }}>
            email@gmail.com
          </Typography>
        </div>
      </DropDownItem>
      <DropDownItemWithIcon textValue={'Value two'} icon={<Eye />} />
      <DropDownItemWithIcon textValue={'Value three'} icon={<Eye />} />
    </DropdownMenu>
  )
}
