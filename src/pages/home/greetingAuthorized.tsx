import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useNavigateBackToDeck } from '@/pages/decks/hooks-and-functions'
import s from '@/pages/home/greeting.module.scss'

export const GreetingAuthorized = () => {
  const { navigateBackToDeck } = useNavigateBackToDeck() //!!!

  return (
    <div className={s.container}>
      <Card id="cardHome" className={s.cardHome}>
        <Typography variant="h3" className={s.signInTypographyBody}>
          {
            'Learning cards are an interactive way to learn new material or review what you have already learned. Each card contains a question and an answer. You can create your own sets of cards or use ready-made sets created by other users. To study, you receive a random card from the set, the probability of a card falling out depends on how well you answered the question. Good luck with your study!'
          }
        </Typography>

        <div className={s.signInButtonWrapper}>
          <Button
            variant={'tertiary'}
            className={s.signInButton}
            // as={NavLink}
            // to={'/deck'}
            onClick={navigateBackToDeck}
            fullWidth
          >
            <Typography variant="h1">{`Начать обучение!`}</Typography>
          </Button>
        </div>
      </Card>
    </div>
  )
}
