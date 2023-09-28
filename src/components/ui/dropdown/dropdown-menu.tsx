import * as Dropdown from '@radix-ui/react-dropdown-menu'

import s from './dropdown-menu.module.scss'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export const DropdownMenu = () => {
  const classNames = {
    content: s.content,
    item: s.item,
    separator: s.separator,
  }

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Button>Trigger</Button>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content className={classNames.content} sideOffset={5}>
          <Dropdown.Item className={classNames.item}>
            <Typography>First item</Typography>
          </Dropdown.Item>
          <Dropdown.Separator className={classNames.separator} />
          <Dropdown.Item className={classNames.item}>
            <Typography>Second item</Typography>
          </Dropdown.Item>
          <Dropdown.Arrow />
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  )
}
