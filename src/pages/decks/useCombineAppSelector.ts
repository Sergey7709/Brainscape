import { useAppSelector } from '@/service'

export const useCombineAppSelector = () => {
  const currentPage = useAppSelector(state => state.deckReducer.currentPage)
  const itemsPerPage = useAppSelector(state => state.deckReducer.itemsPerPage)
  const minMaxCardsCount = useAppSelector(state => state.deckReducer.minMaxCardsCount)
  const myOrAllAuthorCards = useAppSelector(state => state.deckReducer.authorCards)
  const findName = useAppSelector(state => state.deckReducer.findName)
  const orderBy = useAppSelector(state => state.deckReducer.orderBy)

  return { currentPage, itemsPerPage, minMaxCardsCount, myOrAllAuthorCards, findName, orderBy }
}
