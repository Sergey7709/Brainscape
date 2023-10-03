import { ComponentPropsWithRef, Dispatch, ReactNode, SetStateAction } from 'react'

export type SizeForModal = 'sm' | 'md' | 'lg'

export type ShowCloseBtn = {
  showCloseButton?: boolean
}
export type SizeModal = {
  size?: SizeForModal
}

export type ModalContextValue = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
} & ShowCloseBtn &
  SizeModal

export type ModalProps = {
  active?: boolean
} & ShowCloseBtn &
  SizeModal &
  ComponentPropsWithRef<'div'>

export type PropsChildren = { children: ReactNode; className?: string }

export type headModal = {
  justifyContent?: 'left' | 'center' | 'right'
  borderBottom?: boolean
} & PropsChildren

export type PortalOverlay = {
  children?: ReactNode
}
