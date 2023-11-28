import s from '@/pages/pack/pack.module.scss'

export const RenderNoData = () => {
  return (
    <tr className={s.td}>
      <td colSpan={5}>
        <p className={s.textNoData}>Упс... данные отсутствуют</p>
      </td>
    </tr>
  )
}
