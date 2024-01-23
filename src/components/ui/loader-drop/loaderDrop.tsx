import { clsx } from 'clsx'

import s from './LoaderDrop.module.scss'

export const LoaderDrop = () => {
  return (
    <div className={s.overlay}>
      <div className={clsx(s.loader, s.basis)}>
        <span className={s.binary}></span>
        <span className={s.binary}></span>
        <span className={s.gettingThere}>{`LOOKING FOR...`}</span>
      </div>
    </div>
  )
}
