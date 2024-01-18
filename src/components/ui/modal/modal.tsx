import { FC, createContext } from 'react'

import { ModalContextValue, ModalProps } from '@/components/ui/modal/typeForModal.ts'

/**
 * Modal component that provides a modal context for managing the state of the modal.

 * @param active - Whether the modal is active or not. Defaults to false.
 * @param size - The size of the modal. Can be 'sm', 'md', or 'lg'. Defaults to 'md'.
 * @param showCloseButton - Whether to show the close button in the modal header or not. Defaults to true.
 * @param className - Additional CSS class names for the modal container.
 * @param restProps - Any other props that can be passed to the modal container div.
 */

export const ModalContext = createContext<ModalContextValue>({
  open: false,
  setOpen: () => {},
})

export const Modal: FC<ModalProps> = props => {
  const {
    children,
    className,
    open,
    setOpen,
    size = 'md',
    showCloseButton = true,
    ...restProps
  } = props

  return (
    <>
      <ModalContext.Provider value={{ open, setOpen, size, showCloseButton, ...restProps }}>
        <div {...restProps}>{children}</div>
      </ModalContext.Provider>
    </>
  )
}
