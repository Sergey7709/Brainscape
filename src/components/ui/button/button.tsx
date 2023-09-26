import {
  ComponentPropsWithoutRef,
  forwardRef,
  ElementType,
  ReactNode,
  ElementRef,
  ForwardedRef,
} from 'react'

import { clsx } from 'clsx'

import s from './button.module.scss'

import { Loading } from '@/assets/icons'

const BUTTON_VARIANTS = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  link: 'link',
} as const

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  variant?: (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS]
  loading?: boolean
  width?: string | number
  height?: string | number
} & ComponentPropsWithoutRef<T>
const ButtonPolymorph = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
  ref: ElementRef<T>
): ReactNode => {
  const {
    variant = 'primary',
    fullWidth,
    className,
    as: Tag = 'button',
    disabled,
    loading,
    children,
    width,
    height,
    ...rest
  } = props

  const tagClassName = clsx(
    s[variant],
    fullWidth && s.fullWidth,
    s[className],
    disabled && 'href' in rest && s.disabled,
    loading && s.loading
  )

  return (
    // @ts-expect-error todo: not sure how to type it

    <Tag ref={ref} className={tagClassName} disabled={disabled} style={{ width, height }} {...rest}>
      {loading && (
        <div className={clsx(s.loadingWrapper)}>
          <Loading />
        </div>
      )}
      <div className={s.children}>{children}</div>
    </Tag>
  )
}

export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType = 'button'>(
  props: ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>> & {
      ref?: ForwardedRef<ElementRef<T>>
    }
) => ReturnType<typeof ButtonPolymorph>
