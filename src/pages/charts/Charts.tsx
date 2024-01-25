import { ArcElement, Chart, registerables } from 'chart.js'
import { useNavigate } from 'react-router-dom'

import s from './Charts.module.scss'

import { ArrowLeftFull } from '@/assets/icons/arrow-left-full.tsx'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { AmountOfCards } from '@/pages/charts/graphics/amount-of-cards/amount-of-cards.tsx'
import { DeckCreators } from '@/pages/charts/graphics/deck-creators/deck-creators.tsx'
import { WeekStatistic } from '@/pages/charts/graphics/week-statistic/week-statistic.tsx'
import { useGetDecksQuery } from '@/service'

Chart.register(...registerables)

Chart.register(ArcElement)

export const Charts = () => {
  const { data, isFetching, isLoading } = useGetDecksQuery(`itemsPerPage=100000000`)

  const navigate = useNavigate()

  if (isFetching || isLoading) return <Loader />

  return (
    <div className={s.container}>
      <div className={s.buttonWrapper}>
        <Button
          variant={'link'}
          as={'button'}
          onClick={() => navigate(-1)}
          className={s.btn}
          fullWidth
        >
          <ArrowLeftFull />
          Back to previous page
        </Button>
      </div>

      <div className={s.firstSection}>
        <div className={s.wrapper}>
          <AmountOfCards items={data!.items} />
        </div>
        <div className={s.wrapper}>
          <DeckCreators items={data!.items} />
        </div>
        <div className={s.wrapper}>
          <WeekStatistic items={data!.items} />
        </div>
      </div>
    </div>
  )
}
