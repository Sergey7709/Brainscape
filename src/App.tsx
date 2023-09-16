import { Button } from '@/components/ui/button'

export function App() {
  return (
    <div>
      <Button as={'button'} variant={'primary'}>
        button
      </Button>
      Hello
      <Button as={'a'} variant={'primary'} href={'/link'}>
        link
      </Button>
    </div>
  )
}
