import { useLocation } from 'react-router-dom'

export const useSaveUrlDeck = () => {
  const location = useLocation()

  return () => {
    sessionStorage.setItem('previousPath', location.search)
  }
}
