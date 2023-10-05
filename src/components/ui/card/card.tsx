import { ComponentPropsWithoutRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

type CardProps = {} & ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...restDefaultProps }, ref) => {
    return <div ref={ref} className={clsx(s.cardBase, className)} {...restDefaultProps} />
  }
)
