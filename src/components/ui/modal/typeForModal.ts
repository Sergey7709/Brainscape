import { ComponentPropsWithRef, Dispatch, ReactNode, SetStateAction } from 'react'

export type SizeForModal = 'sm' | 'md' | 'lg'

export type JustifyContent = 'left' | 'center' | 'right'

export type ShowCloseBtn = {
  showCloseButton?: boolean
}
export type SizeModal = {
  size?: SizeForModal
}

export type ModalProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
} & ShowCloseBtn &
  SizeModal &
  ComponentPropsWithRef<'div'> &
  PropsForStorybookWork

export type PropsChildren = { children: ReactNode; className?: string }

export type headModal = {
  justifyContentHeader?: JustifyContent
  borderBottomHeader?: boolean
} & PropsChildren

export type PortalOverlay = {
  children?: ReactNode
} & ComponentPropsWithRef<'div'>

export type PropsForStorybookWork = {
  borderBottomHeader?: boolean
  justifyContentHeader?: JustifyContent
}
