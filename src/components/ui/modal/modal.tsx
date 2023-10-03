import { FC, createContext, useState } from 'react'

import { ModalContextValue, ModalProps } from '@/components/ui/modal/typeForModal.ts'

export const ModalContext = createContext<ModalContextValue>({
  open: false,
  setOpen: () => {},
  size: 'md',
})

export const Modal: FC<ModalProps> = ({
  children,
  className,
  active = false,
  size = 'md',
  showCloseButton = true,
}) => {
  const [open, setOpen] = useState(active)

  return (
    <>
      <ModalContext.Provider value={{ open, setOpen, size, showCloseButton }}>
        <div className={className}>{children}</div>
      </ModalContext.Provider>
    </>
  )
}
