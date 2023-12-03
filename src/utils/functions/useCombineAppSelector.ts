import { useAppSelector } from '@/service'

export const useCombineAppSelector = () => {
  // const currentPage = useAppSelector(state => state.deckReducer.currentPage)
  const searchValue = useAppSelector(state => state.deckReducer.findName)
  const valueForSlider = useAppSelector(state => state.deckReducer.minMaxCardsCount)
  const packSearchValue = useAppSelector(state => state.deckReducer.packFindName)
  const selectItemsPerPage = useAppSelector(state => state.deckReducer.selectItemsPerPage) ///!!!!
  // const sortTable = useAppSelector(state => state.deckReducer.sortTable)

  return {
    // currentPage,
    searchValue,
    valueForSlider,
    packSearchValue,
    selectItemsPerPage,
    // sortTable,
  }
}
