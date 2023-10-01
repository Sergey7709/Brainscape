import {
  FC,
  ReactElement,
  ReactNode,
  SyntheticEvent,
  cloneElement,
  useEffect,
  useRef,
  useContext,
} from 'react'

import { clsx } from 'clsx'
import { createPortal } from 'react-dom'

import s from './modal.module.scss'

import { CloserButton } from '@/assets/icons/closer-button.tsx'
import { ModalContext } from '@/components/ui/modal/modal.tsx'
import {
  getElementsToFocus,
  nextFocusToElement,
  useCreatePortal,
} from '@/components/ui/modal/utilsForModal.ts'

const PortalAndOverlay: FC<{
  children?: ReactNode
}> = ({ children }) => {
  const { open, setOpen } = useContext(ModalContext)

  const portal = useCreatePortal()
  const previousFocus = useRef<HTMLElement | null>(null)

  // click to close overlay
  const container = useRef<HTMLDivElement>(null)
  const onOverlayClick = (e: SyntheticEvent<Node>) => {
    if (!container.current?.contains(e.target as Node)) {
      setOpen(false)
    }
  }

  // close on esc
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      switch (e.key) {
        case 'Escape': {
          setOpen(false)
          break
        }
        case 'Tab': {
          e.preventDefault()
          nextFocusToElement(getElementsToFocus(container.current), e.shiftKey)
          break
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, setOpen])

  useEffect(() => {
    // Set aria-hidden attribute on the root element
    document.getElementById('root')?.setAttribute('aria-hidden', open.toString())

    // Set aria-hidden attribute on the portal element
    portal.current?.setAttribute('aria-hidden', (!open).toString())

    if (open) {
      // Save the current active element as the previous focus
      previousFocus.current = (document.activeElement as HTMLElement) ?? null
      // Focus on the next element within the container
      nextFocusToElement(getElementsToFocus(container.current))
    } else {
      // Restore focus to the previous active element
      previousFocus.current?.focus?.()
      previousFocus.current = null
    }
  }, [open, portal])

  return createPortal(
    <div className={clsx(s.overlay, `${open ? s.visible : s.invisible}`)} onClick={onOverlayClick}>
      {/* overlay */}
      <div className={clsx(s.childrenContainer)} ref={container}>
        {/* container */}
        <div className={s.childrenContent}>{children}</div>
        {/* content */}
        <button className={s.closeButton} onClick={() => setOpen(false)}>
          <CloserButton />
        </button>
        {/* close button in the corner */}
      </div>
    </div>,
    portal.current
  )
}

const Head: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={s.childrenHead}>
    <h1 className={s.textHead}>{children}</h1>
  </div>
)

const Body: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={s.childrenBody}>{children}</div>
)

const Footer: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={s.childrenFooter}>{children}</div>
)

const Trigger: FC<{ children: ReactElement }> = ({ children }) => {
  const { setOpen } = useContext(ModalContext)

  return cloneElement(children, { onClick: () => setOpen(true) })
}

export const ModalConstructor = { PortalAndOverlay, Head, Body, Footer, Trigger }
