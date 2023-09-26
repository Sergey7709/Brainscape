import { CSSProperties, useState } from 'react'

import * as Select from '@radix-ui/react-select'

import s from './select.module.scss'

import { ArrowDown, ArrowUp } from '@/assets/icons'

type Option = {
  label: string | number
  value: string
}
type SelectType = {
  disabled?: boolean
  options: Option[]
  label?: string
  style?: CSSProperties
  className?: string
  placeholder?: string
}
export const CustomSelect = ({
  disabled = false,
  options,
  label,
  style,
  className,
  placeholder,
}: SelectType) => {
  const [open, setOpen] = useState(false)
  const onOpenChangeHandler = () => {
    setOpen(!open)
  }

  return (
    <Select.Root onOpenChange={onOpenChangeHandler} open={open} disabled={disabled}>
      <Select.Trigger className={s.trigger}>
        <Select.Value className={s.value} placeholder={placeholder || options[0].label} />
        <Select.Icon>{open ? <ArrowUp /> : <ArrowDown />}</Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position="popper">
          <Select.Viewport className={s.viewport}>
            {options.map(option => (
              <Select.Item key={option.value} value={option.value} className={s.item}>
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
