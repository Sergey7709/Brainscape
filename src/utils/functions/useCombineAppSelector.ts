import { useAppSelector } from '@/service'

export const useCombineAppSelector = () => {
  const currentPage = useAppSelector(state => state.deckReducer.currentPage)

  return {
    currentPage,
  }
}
