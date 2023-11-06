import { useAppSelector } from '@/service'

export const useCombineAppSelector = () => {
  const currentPage = useAppSelector(state => state.deckReducer.currentPage)
  const itemsPerPage = useAppSelector(state => state.deckReducer.itemsPerPage)
  const minMaxCardsCount = useAppSelector(state => state.deckReducer.minMaxCardsCount)
  const myOrAllAuthorCards = useAppSelector(state => state.deckReducer.authorCards)

  return { currentPage, itemsPerPage, minMaxCardsCount, myOrAllAuthorCards }
}