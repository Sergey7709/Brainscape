import { FC } from 'react'

import { NavLink } from 'react-router-dom'

import s from './home.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useGetAuthUserMeDataQuery } from '@/service'

export const Home: FC = () => {
  const { isSuccess: isAuthenticated } = useGetAuthUserMeDataQuery()

  return (
    <div className={s.container}>
      <Card id="cardHome" className={s.cardHome}>
        <Typography
          variant="large"
          className={s.signInTypography}
        >{`Добро пожаловать на наш сайт!`}</Typography>
        <Typography
          variant="h3"
          className={s.signInTypography}
        >{`Это домашняя страница.`}</Typography>

        {isAuthenticated && (
          <div className={s.signInButton}>
            <Button variant={'primary'} as={NavLink} to={'/deck'} fullWidth>
              Перейти на страницу карточек
            </Button>
          </div>
        )}
        {!isAuthenticated && (
          <div className={s.signInButton}>
            <Button variant={'primary'} as={NavLink} to={'/Login'} fullWidth>
              Авторизуйтесь или зарегистрируйтесь
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}

export default Home
