import { Link, useNavigate } from 'react-router-dom'

import s from './header.module.scss'

import { Logout } from '@/assets/icons'
import Logo from '@/assets/icons/logo.tsx'
import ProfileOutline from '@/assets/icons/profile-outline.tsx'
import defaultAvatar from '@/assets/images/test.png'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DropDownItem, DropDownItemWithIcon, DropdownMenu } from '@/components/ui/dropdown'
import { Typography } from '@/components/ui/typography'

type User = {
  avatar?: string
  email: string
  name: string
}

type HeaderProps = {
  isAuth: boolean
  user?: User
  onSignOut?: () => void
}
export const Header = ({ isAuth, user, onSignOut }: HeaderProps) => {
  const classNames = {
    wrapper: s.wrapper,
    profile: s.profile,
    name: s.name,
  }

  return (
    <Card className={classNames.wrapper}>
      <Link to={'/'}>
        <Logo />
      </Link>
      {isAuth && user ? (
        <div className={classNames.profile}>
          <Typography className={classNames.name} variant={'body1'}>
            {user.name}
          </Typography>
          <UserMenu
            avatar={user.avatar}
            name={user.name}
            email={user.email}
            onSignOut={onSignOut}
          />
        </div>
      ) : (
        <Link to={'/login'}>
          <Button>Sing in</Button>
        </Link>
      )}
    </Card>
  )
}

const UserMenu = ({ avatar, name, email, onSignOut }: User & Pick<HeaderProps, 'onSignOut'>) => {
  const navigate = useNavigate()

  const classNames = {
    avatar: s.avatar,
    profileInfo: s.profileInfo,
  }

  return (
    <DropdownMenu
      align={'end'}
      trigger={<img className={classNames.avatar} src={avatar || defaultAvatar} alt={'avatar'} />}
    >
      <DropDownItem className={classNames.profileInfo}>
        <img src={avatar || defaultAvatar} alt={'icon'} className={s.image} />
        <div className={s.info}>
          <Typography>{name}</Typography>
          <Typography variant={'caption'} className={s.email}>
            {email}
          </Typography>
        </div>
      </DropDownItem>
      <DropDownItemWithIcon
        onSelect={() => navigate('/profile')}
        textValue={'My Profile'}
        icon={<ProfileOutline />}
      />
      <DropDownItemWithIcon onSelect={onSignOut} textValue={'Sign out'} icon={<Logout />} />
    </DropdownMenu>
  )
}
