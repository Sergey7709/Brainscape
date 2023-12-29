import { ArrowLeftFull } from '@/assets/icons/arrow-left-full.tsx'
import { Button } from '@/components/ui/button'
import { useNavigateBackToDeck } from '@/pages/decks/hooks-and-functions'

type BackToDeckLinkProps = {
  className: string
}
export const BackToDeckLink = ({ className }: BackToDeckLinkProps) => {
  const { navigateBackToDeck } = useNavigateBackToDeck()

  return (
    <Button variant={'link'} className={className} onClick={navigateBackToDeck}>
      <ArrowLeftFull />
      Back to Packs List
    </Button>
  )
}
