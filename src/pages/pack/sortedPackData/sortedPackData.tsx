import { useGetDataForPack } from '@/pages/pack/hooks'
import { PackRow } from '@/pages/pack/pack-row/pack-row.tsx'

export const SortedPackData = () => {
  const { dataDeck, mePackCards, dataCards } = useGetDataForPack()

  return dataCards?.items.map(pack => (
    <PackRow key={pack.id} rating={dataDeck?.rating || 0} mePackCards={mePackCards} {...pack} />
  ))
}
