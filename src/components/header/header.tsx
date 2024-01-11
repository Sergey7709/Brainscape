import { Link, NavLink, useNavigate } from 'react-router-dom'

import s from './header.module.scss'

import { Logout, SlicesOutlined } from '@/assets/icons'
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
    cardHeader: s.cardHeader,
    profile: s.profile,
    name: s.name,
  }

  return (
    <div className={s.containerHeader}>
      <Card className={classNames.cardHeader}>
        <div className={s.wrapperHeaderInCard}>
          <Button as={NavLink} to={'/'} variant={'link'} className={s.linkHeader}>
            <Logo />
          </Button>

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
              <Button className={s.buttonHeader}>Sing in</Button>
            </Link>
          )}
        </div>
      </Card>
    </div>
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
      className={s.dropdownMenu}
    >
      <DropDownItem className={classNames.profileInfo}>
        <img src={avatar || defaultAvatar} alt={'icon'} className={s.image} />
        <div className={s.info}>
          <Typography className={s.name}>{name}</Typography>
          {/*<Typography variant={'caption'} className={s.email}>*/}
          <Typography className={s.email}>{email}</Typography>
        </div>
      </DropDownItem>
      <DropDownItemWithIcon
        onSelect={() => navigate('/profile')}
        textValue={'My Profile'}
        icon={<ProfileOutline />}
      />
      <DropDownItemWithIcon
        onSelect={() => navigate('/charts')}
        textValue={'Analytics'}
        icon={<SlicesOutlined />}
      />
      <DropDownItemWithIcon onSelect={onSignOut} textValue={'Sign out'} icon={<Logout />} />
    </DropdownMenu>
  )
}
