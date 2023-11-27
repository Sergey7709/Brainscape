import { ArcElement, Chart, registerables } from 'chart.js'

import { Loader } from '@/components/ui/loader'
import { AmountOfCards } from '@/pages/charts/graphics/AmountOfCards.tsx'
import { useGetDecksQuery } from '@/service'

Chart.register(...registerables)

Chart.register(ArcElement)

export const Charts = () => {
  const { data, isFetching, isLoading } = useGetDecksQuery('itemsPerPage=1750')

  if (isFetching || isLoading) return <Loader />

  return (
    <>
      <div style={{ margin: '100px' }}>UsersCount: {data?.items.length}</div>
      <AmountOfCards items={data!.items} />
    </>
  )
}
