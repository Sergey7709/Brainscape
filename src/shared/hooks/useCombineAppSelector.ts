import { useAppSelector } from '@/service'

export const useCombineAppSelector = () => {
  const searchValue = useAppSelector(state => state.deckReducer.findName)
  const valueForSlider = useAppSelector(state => state.deckReducer.minMaxCardsCount)
  const packSearchValue = useAppSelector(state => state.deckReducer.packFindName)
  const selectItemsPerPage = useAppSelector(state => state.deckReducer.selectItemsPerPage)

  return {
    searchValue,
    valueForSlider,
    packSearchValue,
    selectItemsPerPage,
  }
}
