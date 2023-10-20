import { FC } from 'react'

import s from './loader.module.scss'

type LoaderProps = {
  text?: string
}

export const Loader: FC<LoaderProps> = ({ text = 'Loading....' }) => {
  return (
    <div className={s.overlay}>
      <div className={s.container}>
        <div className={s.folder}>
          <div className={s.top}></div>
          <div className={s.bottom}></div>
        </div>
        <div className={s.title}>{text}</div>
      </div>
    </div>
  )
}
