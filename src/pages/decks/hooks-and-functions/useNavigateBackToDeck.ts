import { useLocation, useNavigate } from 'react-router-dom'

import { decksPath } from '@/router'
import { clearFilterReducer, searchParamsDeckUrl, useAppDispatch } from '@/service'

export const useNavigateBackToDeck = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const navigateBackToDeck = () => {
    const urlDeck = sessionStorage.getItem(searchParamsDeckUrl)

    if (location.pathname.includes('deck')) {
      return
    } else if (urlDeck) {
      navigate(`${decksPath}${urlDeck}`)
    } else {
      dispatch(clearFilterReducer())
      navigate(decksPath)
    }
  }

  return { navigateBackToDeck }
}
