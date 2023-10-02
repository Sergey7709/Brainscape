import { FC, ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react'

type ModalContextValue = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalContext = createContext<ModalContextValue>({
  open: false,
  setOpen: () => {},
})

type ModalProps = {
  children: ReactNode
  className?: string
  active?: boolean
}
export const Modal: FC<ModalProps> = ({ children, className, active = false }) => {
  const [open, setOpen] = useState(active)

  return (
    <>
      <ModalContext.Provider value={{ open, setOpen }}>
        <div className={className}>{children}</div>
      </ModalContext.Provider>
    </>
  )
}
