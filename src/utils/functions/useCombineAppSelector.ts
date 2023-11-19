import { useAppSelector } from '@/service'

export const useCombineAppSelector = () => {
  const currentPage = useAppSelector(state => state.deckReducer.currentPage)
  const searchValue = useAppSelector(state => state.deckReducer.findName)
  const valueForSlider = useAppSelector(state => state.deckReducer.minMaxCardsCount)
  const sortTable = useAppSelector(state => state.deckReducer.sortTable)

  return {
    currentPage,
    searchValue,
    valueForSlider,
    sortTable,
  }
}
