import { FC, ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react'

type ModalContextType = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalContext = createContext<ModalContextType>({
  open: false,
  setOpen: () => {},
})

type ModalType = {
  children: ReactNode
  className?: string
  active?: boolean
}
export const Modal: FC<ModalType> = ({ children, className, active = false }) => {
  const [open, setOpen] = useState(active)

  return (
    <>
      <ModalContext.Provider value={{ open, setOpen }}>
        <div className={className}>{children}</div>
      </ModalContext.Provider>
    </>
  )
}
