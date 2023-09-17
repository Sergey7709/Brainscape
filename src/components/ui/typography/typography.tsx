import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

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
  children?: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'span'>({
  as,
  variant = 'body1',
  className,
  children,
  ...rest
}: TypographyProps<T> & ComponentPropsWithoutRef<T>) => {
  const Component = as ?? 'span'

  const classes = clsx(s[variant], className)

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  )
}
