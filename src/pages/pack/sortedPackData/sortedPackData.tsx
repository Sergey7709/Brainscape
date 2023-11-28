import { PackRow } from '@/pages/pack/pack-row/pack-row.tsx'
import { PackCards } from '@/service/decks/decks.types.ts'

type SortedPackDataProps = {
  items: PackCards[]
  rating: number
}
export const SortedPackData = ({ items, rating }: SortedPackDataProps) => {
  return items.map(pack => <PackRow key={pack.id} rating={rating || 0} {...pack} />)
}
