import { Loader } from '@/components/ui/loader'
import { useGetDataForPack } from '@/pages/pack/hooks'
import { PackRow } from '@/pages/pack/pack-row/pack-row.tsx'
// import { PackCards } from '@/service/decks/decks.types.ts'

// type SortedPackDataProps = {
//   items: PackCards[]
//   rating: number
//   mePackCards: boolean
// }
export const SortedPackData = () => {
  const {
    // isLoadingAuth,
    // dataMeId,
    dataDeck,
    mePackCards,
    isLoadingDeck,
    isFetchingDeck,
    dataCards,
    isLoadingCards,
    isFetchingCards,
    // isSuccessCards,
    // itemsPerPage,
    // totalItems,
    // totalPages,
    // paginationValueInURL,
    // sort,
  } = useGetDataForPack()

  return (
    <>
      {(isLoadingCards || isFetchingCards || isLoadingDeck || isFetchingDeck) && <Loader />}
      {dataCards?.items.map(pack => (
        <PackRow key={pack.id} rating={dataDeck?.rating || 0} mePackCards={mePackCards} {...pack} />
      ))}
    </>
  )
}
