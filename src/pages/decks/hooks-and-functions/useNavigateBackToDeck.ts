import { useNavigate } from 'react-router-dom'

export const useNavigateBackToDeck = () => {
  const navigate = useNavigate()

  const navigateBackToDeck = () => {
    const urlDeck = sessionStorage.getItem('previousPath')

    if (urlDeck) {
      navigate(`/deck${urlDeck}`)
    } else {
      navigate('/deck')
    }
  }

  return { navigateBackToDeck }
}
