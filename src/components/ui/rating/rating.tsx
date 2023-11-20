import { FC, ReactElement, useState } from 'react'

import clsx from 'clsx'

import s from './rating.module.scss'

import { StarFulfilled, StarOutlined } from '@/assets/icons'

interface RatingProps {
  className?: string
  count: number
  value?: number
  onChangeValue?: (value: number) => void
  emptyIcon?: ReactElement
  fullIcon?: ReactElement
}

export const Rating: FC<RatingProps> = ({
  className,
  count,
  value = 0,
  onChangeValue,
  emptyIcon = <StarOutlined />,
  fullIcon = <StarFulfilled />,
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined)

  const classNames = {
    wrapper: clsx(s.wrapper, className),
    star: s.star,
  }

  const handleMouseMove = (index: number) => {
    setHoverValue(index)
  }

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  const handleClick = (index: number) => {
    if (onChangeValue) {
      onChangeValue(index + 1)
    }
  }

  const stars = []

  for (let i = 0; i < count; i++) {
    let star = i < value ? fullIcon : emptyIcon

    if (hoverValue !== undefined && i <= hoverValue) {
      star = fullIcon
    }

    stars.push(
      <span
        key={i}
        style={{ cursor: 'pointer' }}
        onMouseMove={() => handleMouseMove(i)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(i)}
      >
        {star}
      </span>
    )
  }

  return <div className={classNames.wrapper}>{stars}</div>
}
