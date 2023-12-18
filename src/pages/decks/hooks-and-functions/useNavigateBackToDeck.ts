import { useLocation, useNavigate } from 'react-router-dom'

export const useNavigateBackToDeck = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navigateBackToDeck = () => {
    const urlDeck = sessionStorage.getItem('previousPath')

    if (location.pathname.includes('deck')) {
      return
    } else {
      navigate(`/deck${urlDeck}`)
    }
  }

  return { navigateBackToDeck }
}
