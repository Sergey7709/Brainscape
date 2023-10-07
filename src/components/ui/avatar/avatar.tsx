import { ReactNode } from 'react'

import * as Avatar from '@radix-ui/react-avatar'

import s from './avatar.module.scss'

type AvatarProps = {
  src?: string
  alt?: string
  children?: ReactNode
}
export const Avatars = ({ src, alt, children }: AvatarProps) => (
  <div style={{ display: 'flex', gap: 20 }}>
    <Avatar.Root className={s.avatarRoot}>
      <Avatar.Image className={s.avatarImage} src={src} />
      <Avatar.Fallback className={s.avatarFallback} delayMs={600}>
        {alt}
      </Avatar.Fallback>
      {children}
    </Avatar.Root>
  </div>
)
