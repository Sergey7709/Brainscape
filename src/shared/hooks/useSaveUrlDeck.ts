import { useLocation } from 'react-router-dom'

import { searchParamsDeckUrl } from '@/shared'

export const useSaveUrlDeck = () => {
  const location = useLocation()

  return () => {
    sessionStorage.setItem(searchParamsDeckUrl, location.search)
  }
}
