import { ComponentPropsWithRef, ElementType, forwardRef, ReactNode, Ref } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

type TypographyProps<T extends ElementType = 'span'> = {
  as?: T
  variant?:
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'body1'
    | 'body2'
    | 'subtitle1'
    | 'subtitle2'
    | 'caption'
    | 'overline'
    | 'link1'
    | 'link2'
    | 'error'
  children?: ReactNode
  className?: string
} & ComponentPropsWithRef<T>

export const Typography = forwardRef(
  <T extends ElementType = 'span'>(
    { as, variant = 'body1', className, children, ...rest }: TypographyProps<T>,
    ref: Ref<T>
  ) => {
    const Component = as ?? 'span'

    const classes = clsx(s[variant], className)

    return (
      <Component ref={ref} className={classes} {...rest}>
        {children}
      </Component>
    )
  }
)
