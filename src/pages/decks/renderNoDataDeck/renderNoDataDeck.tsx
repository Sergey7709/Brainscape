import s from '@/pages/decks/decks.module.scss'

export const RenderNoDataDeck = () => {
  return (
    <tr className={s.td}>
      <td colSpan={5}>
        <p className={s.textNoData}>Упс... данные отсутствуют</p>
      </td>
    </tr>
  )
}
