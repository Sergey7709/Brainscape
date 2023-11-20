import { ComponentProps, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { clsx } from 'clsx'

import s from './textField.module.scss'

import { Close, Eye, VisibilityOff } from '@/assets/icons'
import { Search } from '@/assets/icons/search.tsx'
import { Typography } from '@/components/ui/typography'

export type TextFieldProps = {
  onValueChange?: (value: string) => void
  type?: 'password' | 'text' | 'search'
  containerProps?: ComponentProps<'div'>
  labelProps?: ComponentProps<'label'>
  errorMessage?: string
  label?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      errorMessage,
      placeholder,
      type,
      containerProps,
      labelProps,
      label,
      onChange,
      onValueChange,
      value,
      ...restProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const [localValue, setLocalValue] = useState<string>('')

    const inputValue = value ?? localValue

    const isShowPasswordButtonShown = type === 'password'
    const isSearchInput = type === 'search'

    const finalType = getFinalType(type, showPassword)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value)
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    const clearHandler = () => {
      setLocalValue('')
      onValueChange?.('')
    }

    const classNames = {
      root: clsx(s.root, containerProps?.className),
      fieldContainer: clsx(s.fieldContainer),
      field: clsx(s.field, !!errorMessage && s.error, className),
      label: clsx(s.label, labelProps?.className),
      error: clsx(s.error),
    }

    return (
      <div className={classNames.root}>
        {label && (
          <Typography variant="body2" as="label" className={classNames.label}>
            {label}
          </Typography>
        )}
        <div className={classNames.fieldContainer}>
          {isSearchInput && <Search className={s.searchIcon} />}
          <input
            className={classNames.field}
            placeholder={placeholder}
            ref={ref}
            type={finalType}
            value={inputValue}
            onChange={handleChange}
            {...restProps}
          />

          {inputValue && isSearchInput && <Close onClick={clearHandler} className={s.closeIcon} />}

          {isShowPasswordButtonShown && (
            <button
              className={s.showPassword}
              type={'button'}
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <VisibilityOff /> : <Eye />}
            </button>
          )}
        </div>

        <Typography variant="error" className={classNames.error}>
          {errorMessage}
        </Typography>
      </div>
    )
  }
)

function getFinalType(type: ComponentProps<'input'>['type'], showPassword: boolean) {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}
