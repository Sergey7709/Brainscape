import { useLocation } from 'react-router-dom'

import { searchParamsDeckUrl } from '@/utils'

export const useSaveUrlDeck = () => {
  const location = useLocation()

  return () => {
    sessionStorage.setItem(searchParamsDeckUrl, location.search)
  }
}
