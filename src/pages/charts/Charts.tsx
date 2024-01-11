import { ArcElement, Chart, registerables } from 'chart.js'

import s from './Charts.module.scss'

import { Loader } from '@/components/ui/loader'
import { AmountOfCards } from '@/pages/charts/graphics/amount-of-cards/amount-of-cards.tsx'
import { DeckCreators } from '@/pages/charts/graphics/deck-creators/deck-creators.tsx'
import { WeekStatistic } from '@/pages/charts/graphics/week-statistic/week-statistic.tsx'
import { BackToDeckLink } from '@/pages/pack/backToDeckLink'
import { useGetDecksQuery } from '@/service'

Chart.register(...registerables)

Chart.register(ArcElement)

export const Charts = () => {
  const { data, isFetching, isLoading } = useGetDecksQuery(`itemsPerPage=100000000`)

  const classNames = {
    wrapper: s.wrapper,
    firstSection: s.firstSection,
  }

  if (isFetching || isLoading) return <Loader />

  return (
    <div className={classNames.wrapper}>
      <BackToDeckLink className={s.linkPackList} />

      <div className={classNames.firstSection}>
        <AmountOfCards items={data!.items} />
        <DeckCreators items={data!.items} />
      </div>
      <WeekStatistic items={data!.items} />
    </div>
  )
}
