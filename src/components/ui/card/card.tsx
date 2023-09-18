import { forwardRef, HTMLAttributes } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...restDefaultProps }, ref) => (
    <div ref={ref} className={clsx(s.cardBase, className)} {...restDefaultProps} />
  )
)
