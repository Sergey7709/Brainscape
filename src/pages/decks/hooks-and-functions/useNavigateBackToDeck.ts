import { useLocation, useNavigate } from 'react-router-dom'

export const useNavigateBackToDeck = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // const { id } = useParams()

  const navigateBackToDeck = () => {
    const urlDeck = sessionStorage.getItem('previousPath')

    if (location.pathname.includes('deck')) {
      return
    }
    // else if (location.pathname.includes('learn')) {
    //   navigate(`/pack/${id}`)
    // }
    else {
      navigate(`/deck${urlDeck}`)
    }
  }

  return { navigateBackToDeck }
}
