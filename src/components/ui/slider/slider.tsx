import { CSSProperties } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'

import s from './slider.module.scss'

import { Typography } from '@/components/ui/typography'

type Props = {
  label?: string
  className?: string
  style?: CSSProperties
}

export const Slider = (props: Props & Omit<RadixSlider.SliderProps, keyof Props>) => {
  const { min = 0, max = 100, label, className, value = [0, 100], style, ...restProps } = props

  return (
    <div className={className} style={style}>
      {label && (
        <Typography variant="body1" className={s.label}>
          {label}
        </Typography>
      )}
      <div className={s.slider}>
        <input type="number" className={s.input} value={value[0] ?? min} readOnly />
        <RadixSlider.Root className={s.root} value={value} min={min} max={max} {...restProps}>
          <RadixSlider.Track className={s.track}>
            <RadixSlider.Range className={s.range} />
          </RadixSlider.Track>
          <RadixSlider.Thumb className={s.thumb} />
          <RadixSlider.Thumb className={s.thumb} />
        </RadixSlider.Root>
        <input type="number" className={s.input} value={value[1] ?? max} readOnly />
      </div>
    </div>
  )
}
