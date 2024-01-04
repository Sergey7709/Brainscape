import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { VideoComponent } from '@/components/ui/VideoPlayer'
import s from '@/pages/home/greeting.module.scss'

export const GreetingNonAuthorized = () => {
  return (
    <div className={s.container}>
      <Card id="cardHome" className={s.cardHome}>
        <Typography
          className={s.signInTypographyTitle}
        >{`Welcome to the exciting and educational portal "Learning Cards"!`}</Typography>
        <Typography
          variant="h3"
          className={s.signInTypographyBody}
        >{`Our website provides a unique opportunity to learn and develop by playing exciting educational cards with questions.
Our cards cover a wide range of topics, from general education questions to advanced subject topics. Thanks to the variety of content, there is something for everyone.
Join the "Learning Cards" community and discover the fascinating world of knowledge through play! Learning becomes a pleasure. 🥇`}</Typography>
        <VideoComponent url={'https://fast.wistia.net/embed/iframe/gusdx64r2r?videoFoam=true'} />
        <div className={s.signInButtonWrapper}>
          <Button
            variant={'tertiary'}
            className={s.signInButton}
            as={NavLink}
            to={'/Login'}
            fullWidth
          >
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
