import { ArcElement, Chart, registerables } from 'chart.js'

import s from './Charts.module.scss'

import { Loader } from '@/components/ui/loader'
import { AmountOfCards } from '@/pages/charts/graphics/amount-of-cards/amount-of-cards.tsx'
import { DeckCreators } from '@/pages/charts/graphics/deck-creators/deck-creators.tsx'
import { useGetDecksQuery } from '@/service'

Chart.register(...registerables)

Chart.register(ArcElement)

export const Charts = () => {
  const { data, isFetching, isLoading } = useGetDecksQuery('itemsPerPage=1746')

  const classNames = {
    wrapper: s.wrapper,
  }

  if (isFetching || isLoading) return <Loader />

  return (
    <div className={classNames.wrapper}>
      {/*<div>DecksCount: {data?.items.length}</div>*/}
      <AmountOfCards items={data!.items} />
      <DeckCreators items={data!.items} />
    </div>
  )
}
