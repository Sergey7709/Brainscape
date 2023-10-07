import {
  ComponentPropsWithoutRef,
  forwardRef,
  ElementType,
  ReactNode,
  ComponentPropsWithRef,
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

type AsPolymorphProp<T extends ElementType> = {
  as?: T
}

type ElementProps = {
  variant?: (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS]
  loading?: boolean
  fullWidth?: boolean
}

type PolymorphProps<T extends ElementType, ElementProps = {}> = AsPolymorphProp<T> &
  ElementProps &
  Omit<ComponentPropsWithoutRef<T>, keyof (ElementProps & AsPolymorphProp<T>)>

type PolymorphRef<T extends ElementType> = ComponentPropsWithRef<T>['ref']

type PolymorphPropRef<T extends ElementType> = { ref?: PolymorphRef<T> }

type PolymorphPropsWithRef<T extends ElementType, ElementProps = {}> = PolymorphProps<
  T,
  ElementProps
> &
  PolymorphPropRef<T>

type TagComponent = <T extends ElementType = 'button'>(
  props: PolymorphPropsWithRef<T, ElementProps>
) => ReactNode

const ButtonPolymorph: TagComponent = forwardRef(
  <T extends ElementType = 'button'>(props: PolymorphPropsWithRef<T>, ref?: PolymorphRef<T>) => {
    const {
      variant = 'primary',
      fullWidth,
      className = '',
      as: Tag = 'button',
      disabled,
      loading,
      children,
      ...rest
    } = props

    const tagClassName = clsx(
      s[variant],
      fullWidth && s.fullWidth,
      className,
      disabled && 'href' in rest && s.disabled,
      loading && s.loading
    )

    return (
      <Tag ref={ref} className={tagClassName} disabled={disabled} {...rest}>
        {loading && (
          <div className={clsx(s.loadingWrapper)}>
            <Loading />
          </div>
        )}
        <div className={s.children}>{children}</div>
      </Tag>
    )
  }
)

export const Button = ButtonPolymorph
