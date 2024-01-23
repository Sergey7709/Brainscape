import { useNavigate } from 'react-router-dom'

import s from './error404.module.scss'

import error404 from '@/assets/images/error404.png'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { rootElementPath } from '@/router'

export const Error404 = () => {
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate(rootElementPath)
  }

  const classNames = {
    wrapper: s.wrapper,
    text: s.text,
    btn: s.btn,
  }

  return (
    <div className={classNames.wrapper}>
      <img src={error404} alt={'error'} className={s.image} />
      <Typography variant={'h3'} className={classNames.text}>
        Sorry! Page not found!
      </Typography>
      <Button className={classNames.btn} onClick={onClickHandler}>
        Back to main page
      </Button>
    </div>
  )
}
