import { useState } from 'react'

import * as RadixLabel from '@radix-ui/react-label'
import * as RadixSelect from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './select.module.scss'

import { ArrowDown, ArrowUp } from '@/assets/icons'
import { Typography } from '@/components/ui/typography'

export default () => <RadixLabel.Root />

type SelectOption = {
  title: string | number
  value: string
}

type SelectType = {
  options: SelectOption[]
  onValueChange: (value: string) => void
  disabled?: boolean
  label?: string
  className?: string
  placeholder?: string
  variant?: 'common' | 'pagination'
  fullWidth?: boolean
}

export const Select = ({
  disabled = false,
  options,
  label,
  placeholder,
  onValueChange,
  variant = 'common',
  className,
  /*
  Use this temporary prop for cards
   **/
  fullWidth,
}: SelectType) => {
  const [open, setOpen] = useState(false)
  const onOpenChangeHandler = () => {
    disabled || setOpen(!open)
  }

  const classNames = {
    label: clsx(s.label, disabled && s.disabled),
    trigger: clsx(
      s.trigger,
      variant === 'pagination' && s.triggerPagination,
      disabled && s.disabled,
      fullWidth && s.fullWidth,
      className
    ),
    content: clsx(
      s.content,
      variant === 'pagination' && s.contentPagination,
      fullWidth && s.fullWidth,
      className
    ),
    item: clsx(s.item, variant === 'pagination' && s.itemPagination, className),
    value: s.value,
    icon: clsx(s.icon, disabled && s.disabled),
  }

  return (
    <RadixLabel.Root>
      {label && (
        <Typography
          onClick={onOpenChangeHandler}
          variant={'body2'}
          as={'label'}
          className={s.label}
        >
          {label}
        </Typography>
      )}
      <RadixSelect.Root
        onValueChange={onValueChange}
        onOpenChange={onOpenChangeHandler}
        open={open}
        disabled={disabled}
      >
        <RadixSelect.Trigger className={classNames.trigger}>
          <Typography variant={'body1'}>
            <RadixSelect.Value
              className={classNames.value}
              placeholder={placeholder || options[0].title}
            />
          </Typography>
          <RadixSelect.Icon className={classNames.icon}>
            {open ? <ArrowUp size={16} /> : <ArrowDown size={16} disabled={disabled} />}
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className={classNames.content} position="popper">
            <RadixSelect.Viewport>
              {options.map(option => (
                <RadixSelect.Item
                  key={option.value}
                  value={option.value}
                  className={classNames.item}
                >
                  <RadixSelect.ItemText>{option.title}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </RadixLabel.Root>
  )
}
