import { useGetDataForPack } from '@/pages/pack/hooks'
import { PackRow } from '@/pages/pack/pack-row/pack-row.tsx'

export const SortedPackData = () => {
  const { mePackCards, dataCards } = useGetDataForPack()

  return dataCards?.items.map(pack => <PackRow key={pack.id} mePackCards={mePackCards} {...pack} />)
}
