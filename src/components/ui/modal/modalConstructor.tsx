import {
  FC,
  ReactElement,
  SyntheticEvent,
  cloneElement,
  useEffect,
  useRef,
  useContext,
  ReactNode,
} from 'react'

import { clsx } from 'clsx'
import { createPortal } from 'react-dom'

import s from './modal.module.scss'

import { CloserButton } from '@/assets/icons/closer-button.tsx'
import { ModalContext } from '@/components/ui/modal/modal.tsx'
import { headModal, PortalOverlay, PropsChildren } from '@/components/ui/modal/typeForModal.ts'
import {
  getElementsToFocus,
  nextFocusToElement,
  useCreatePortal,
} from '@/components/ui/modal/utilsForModal.ts'

/**
 * Component that renders a modal overlay and container.
 *
 * @component
 * @param {PortalOverlay} children - The content to be rendered inside the container.
 * @returns {ReactNode} The rendered modal overlay and container.
 */
const PortalAndOverlay: FC<PortalOverlay> = ({ children }: PortalOverlay): ReactNode => {
  const { open, setOpen, size, showCloseButton, ...restProps } = useContext(ModalContext)

  const portal = useCreatePortal()
  const previousFocus = useRef<HTMLElement | null>(null)

  // click to close overlay
  const container = useRef<HTMLDivElement>(null)
  const onOverlayClick = (e: SyntheticEvent<Node>) => {
    if (!container.current?.contains(e.target as Node)) {
      setOpen(false)
    }
  }

  const containerStyle = clsx(s.childrenContainer, size && s[size])
  const overlayStyle = clsx(s.overlay, `${open ? s.visible : s.invisible}`)

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
    <div className={overlayStyle} onClick={onOverlayClick} {...restProps}>
      {/* overlay */}
      <div className={containerStyle} ref={container} {...restProps}>
        {/* container */}
        <div className={s.childrenContent} {...restProps}>
          {children}
        </div>
        {/* content */}
        {showCloseButton && (
          <button className={s.closeButton} onClick={() => setOpen(false)}>
            <CloserButton />
          </button>
        )}
        {/* close button in the corner */}
      </div>
    </div>,
    portal.current
  )
}

/**
 *  Component that displays the modal header (or text).
 *
 * @component
 * @param {headModal} props - The props for the head section.
 * @returns {ReactNode} The rendered head section.
 */
const Head: FC<headModal> = ({
  children,
  className = '',
  justifyContentHeader = 'left',
  borderBottomHeader = false,
}: headModal): ReactNode => {
  const headStyle = clsx(
    s.childrenHead,
    className,
    justifyContentHeader && s[justifyContentHeader],
    borderBottomHeader && s.borderBottom
  )

  return <div className={headStyle}>{children}</div>
}

/**
 * Component that renders the body section of a modal.
 *
 * @component
 * @param {PropsChildren} props - The props for the body section.
 * @returns {ReactNode} The rendered body section.
 */

const Body: FC<PropsChildren> = ({ children, className = '' }: PropsChildren): ReactNode => {
  const bodyStyle = clsx(s.childrenBody, className)

  return <div className={bodyStyle}>{children}</div>
}
/**
 * Component that renders the footer section of a modal.
 *
 * @component
 * @param {PropsChildren} props - The props for the footer section.
 * @returns {ReactNode} The rendered footer section.
 */
const Footer: FC<PropsChildren> = ({ children, className = '' }: PropsChildren): ReactNode => {
  const { size } = useContext(ModalContext)
  const footerStyle = clsx(s.childrenFooter, size && s[size], className)

  return <div className={footerStyle}>{children}</div>
}

/**
 * Component that wraps a trigger element and opens the modal on click.
 *
 * @component
 * @param {ReactElement} children - The trigger element.
 * @returns {ReactNode} The rendered trigger element.
 */

const Trigger: FC<{ children: ReactElement }> = ({
  children,
}: {
  children: ReactElement
}): ReactNode => {
  if (!children) {
    return null
  }
  const { setOpen } = useContext(ModalContext)

  return cloneElement(children, { onClick: () => setOpen(true) })
}

/**
 * Object that exports the modal components.
 */
export const ModalConstructor = { PortalAndOverlay, Head, Body, Footer, Trigger }
