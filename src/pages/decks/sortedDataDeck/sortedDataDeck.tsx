import { DeckRow } from '@/pages/decks/deck-row'
import { useGetDataSort } from '@/pages/decks/hooks-and-functions'

export const SortedDataDeck = () => {
  const { data } = useGetDataSort()

  return data?.items.map(deck => <DeckRow key={deck.id} {...deck} />)
}
