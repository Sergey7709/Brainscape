import { useNavigate } from 'react-router-dom'

import { ArrowLeftFull } from '@/assets/icons/arrow-left-full.tsx'
import { Button } from '@/components/ui/button'

type BackToDeckLinkProps = {
  className: string
}
export const BackToDeckLink = ({ className }: BackToDeckLinkProps) => {
  const navigate = useNavigate()

  const navigateBackToDeck = () => {
    const urlDeck = sessionStorage.getItem('previousPath')

    if (urlDeck) {
      navigate(`/deck${urlDeck}`)
    } else {
      navigate('/deck')
    }
  }

  return (
    <Button variant={'link'} className={className} onClick={navigateBackToDeck}>
      <ArrowLeftFull />
      Back to Packs List
    </Button>
  )
}
