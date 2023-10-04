import { CSSProperties, ReactNode } from 'react'

import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './dropdown-menu.module.scss'

import { Typography } from '@/components/ui/typography'

type DropdownMenuProps = {
  align?: 'start' | 'center' | 'end'
  /*
  Custom components as trigger doesn`t work correctly without forwardRef, use wrapper for these elements
   **/
  trigger?: ReactNode
  className?: string
  style?: CSSProperties
  children: ReactNode
  /*
  Margin top for dropdown content
   **/
  sideOffset?: number
}

export const DropdownMenu = ({
  align,
  trigger,
  className,
  style,
  children,
  sideOffset = 8,
}: DropdownMenuProps) => {
  const classNames = {
    content: clsx(s.content, className),
    item: s.item,
    separator: s.separator,
    arrowBox: s.arrowBox,
    arrow: s.arrow,
    itemsBox: s.itemsBox,
  }

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>{trigger}</Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content
          className={classNames.content}
          style={style}
          align={align}
          sideOffset={sideOffset}
        >
          <Dropdown.Arrow className={classNames.arrowBox} asChild>
            <div className={classNames.arrow} />
          </Dropdown.Arrow>
          <div className={classNames.itemsBox}>{children}</div>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  )
}

type DropDownItemProps = {
  children: ReactNode
  disabled?: boolean
  onSelect?: (event: Event) => void
  className?: string
  style?: CSSProperties
}

export const DropDownItem = ({
  children,
  disabled,
  onSelect,
  className,
  style,
}: DropDownItemProps) => {
  const classNames = {
    item: clsx(s.item, disabled && s.disabled, className),
  }

  return (
    <Dropdown.Item
      className={classNames.item}
      disabled={disabled}
      onSelect={onSelect}
      style={style}
    >
      {children}
    </Dropdown.Item>
  )
}

type DropDownItemWithIconProps = Omit<DropDownItemProps, 'children'> & {
  icon: ReactNode
  textValue: string
}

export const DropDownItemWithIcon = ({
  icon,
  textValue,
  disabled,
  onSelect,
  className,
  style,
}: DropDownItemWithIconProps) => {
  const classNames = {
    item: clsx(s.item, disabled && s.disabled, className),
    icon: s.itemIcon,
  }

  return (
    <Dropdown.Item
      className={classNames.item}
      disabled={disabled}
      onSelect={onSelect}
      style={style}
    >
      <div className={s.itemIcon}>{icon}</div>
      <Typography>{textValue}</Typography>
    </Dropdown.Item>
  )
}
