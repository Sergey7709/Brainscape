import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import s from '@/pages/home/home.module.scss'

export const GreetingAuthorized = () => {
  return (
    <div className={s.container}>
      <Card id="cardHome" className={s.cardHome}>
        <Typography
          variant="h3"
          className={s.signInTypography}
        >{`Обучающие карточки - это интерактивный способ изучения нового материала или повторения уже изученного. Каждая карточка содержит вопрос на одной стороне и ответ на другой. Вы можете создавать свои собственные наборы карточек или использовать готовые наборы, созданные другими пользователями.`}</Typography>
        <Typography
          variant="h3"
          className={s.signInTypography}
        >{`Браузерная игра - это увлекательный способ проверить свои знания и соревноваться с другими игроками. Вы можете выбрать тему, уровень сложности и количество вопросов, которые хотите ответить. За каждый правильный ответ вы получаете очки, а за каждый неправильный - теряете. Цель игры - набрать как можно больше очков и попасть в топ-лист лучших игроков.`}</Typography>

        <div className={s.signInButton}>
          <Button variant={'tertiary'} as={NavLink} to={'/deck'} fullWidth>
            <Typography variant="h1" className={s.signInTypography}>{`Начать игру!`}</Typography>
          </Button>
        </div>
      </Card>
    </div>
  )
}
