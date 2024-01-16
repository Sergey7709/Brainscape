import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import s from '@/pages/home/greeting.module.scss'

export const GreetingAuthorized = () => {
  return (
    <div className={s.container}>
      <Card id="cardHome" className={s.cardHome}>
        <Typography variant="h3" className={s.signInTypographyBody}>
          {
            'Learning Cards are an interactive way to learn new material or repeat what you have already learned. Each card contains a question and an answer. You can create your own sets of cards or use ready-made sets created by other users.'
          }
        </Typography>

        <div className={s.signInButtonWrapper}>
          <Button
            variant={'tertiary'}
            className={s.signInButton}
            as={NavLink}
            to={'/deck'}
            fullWidth
          >
            <Typography variant="h1">{`Начать обучение!`}</Typography>
          </Button>
        </div>
      </Card>
    </div>
  )
}
