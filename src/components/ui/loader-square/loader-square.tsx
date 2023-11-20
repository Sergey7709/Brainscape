import s from './loader-square.module.scss'

export const LoaderSquare = () => {
  return (
    <div className={s.overlay}>
      <div className={s.loader}>
        <div className={s.circle}></div>
        <div className={s.circle}></div>
        <div className={s.circle}></div>
        <div className={s.circle}></div>
      </div>
    </div>
  )
}
