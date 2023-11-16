import { Loader } from '@/components/ui/loader'
import { DeckComposition } from '@/pages/decks/deck-composition/deck-composition.tsx'
import { utilitySearchParams } from '@/pages/decks/hooks-and-functions/utilitySearchParams.ts'
import { useGetDecksQuery } from '@/service'

export const Decks = () => {
  const { isLoading, isFetching } = useGetDecksQuery(utilitySearchParams())

  console.log('Deck')

  return (
    <>
      {(isLoading || isFetching) && <Loader />}
      <DeckComposition />
    </>
  )
}
