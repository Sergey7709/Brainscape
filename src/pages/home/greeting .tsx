import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
// import { VideoComponent } from '@/components/ui/VideoPlayer'
import { VideoComponent } from '@/components/ui/VideoPlayer'
import s from '@/pages/home/home.module.scss'

export const Greeting = () => {
  console.log('greeting')

  return (
    <div className={s.container}>
      <Card id="cardHome" className={s.cardHome}>
        <Typography
          variant="large"
          className={s.signInTypography}
        >{`Welcome to the exciting and educational portal "Learning Cards"!`}</Typography>
        <Typography
          variant="h3"
          className={s.signInTypography}
        >{`Our website provides a unique opportunity to learn and develop by playing exciting educational cards with questions.
Our cards cover a wide range of topics, from general education questions to advanced subject topics. Thanks to the variety of content, there is something for everyone.
Join the "Learning Cards" community and discover the fascinating world of knowledge through play! Learning becomes a pleasure. 🥇`}</Typography>
        <VideoComponent url={'https://streamable.com/e/nz4j97?autoplay=0&nocontrols=1&loop=0'} />
        <div className={s.signInButton}>
          <Button variant={'tertiary'} as={NavLink} to={'/Login'} fullWidth>
            <Typography
              variant="h1"
              className={s.signInTypography}
            >{`Sign in or register`}</Typography>
          </Button>
        </div>
      </Card>
    </div>
  )
}
