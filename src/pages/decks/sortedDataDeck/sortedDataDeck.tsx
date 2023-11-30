import { DeckRow } from '@/pages/decks/deck-row/deck-row.tsx'
import { useGetDataSort } from '@/pages/decks/hooks-and-functions/useGetDataSort.ts'

export const SortedDataDeck = () => {
  const { data } = useGetDataSort()

  return data?.items.map(deck => <DeckRow key={deck.id} {...deck} />)
}
