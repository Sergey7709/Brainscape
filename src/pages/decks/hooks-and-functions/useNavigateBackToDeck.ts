import { useLocation, useNavigate } from 'react-router-dom'

import { clearFilterReducer, useAppDispatch } from '@/service'

export const useNavigateBackToDeck = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch() //!!!!!!!

  const navigateBackToDeck = () => {
    const urlDeck = sessionStorage.getItem('previousPath')

    if (location.pathname.includes('deck')) {
      return
    } else if (urlDeck) {
      navigate(`/deck${urlDeck}`)
    } else {
      dispatch(clearFilterReducer()) //!!!!!!!
      navigate(`/deck`)
    }
  }

  return { navigateBackToDeck }
}
