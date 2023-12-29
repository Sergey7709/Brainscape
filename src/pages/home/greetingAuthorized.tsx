import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import s from '@/pages/home/greeting.module.scss'

export const GreetingAuthorized = () => {
  return (
    <div className={s.container}>
      <Card id="cardHome" className={s.cardHome}>
        <Typography
          variant="h3"
          className={s.signInTypography}
        >{`Обучающие карточки - это интерактивный способ изучения нового материала или повторения уже изученного. Каждая карточка содержит вопрос и ответ. Вы можете создавать свои собственные наборы карточек или использовать готовые наборы, созданные другими пользователями.`}</Typography>

        <div className={s.signInButton}>
          <Button variant={'tertiary'} as={NavLink} to={'/deck'} fullWidth>
            <Typography
              variant="h1"
              className={s.signInTypography}
            >{`Начать обучение!`}</Typography>
          </Button>
        </div>
      </Card>
    </div>
  )
}
