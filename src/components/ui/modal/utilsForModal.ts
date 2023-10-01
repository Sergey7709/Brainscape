import { useEffect, useRef } from 'react'

export const useCreatePortal = () => {
  const portal = useRef(document.createElement('div'))

  useEffect(() => {
    const currentElementDiv = portal.current

    document.body.appendChild(portal.current)

    return () => void document.body.removeChild(currentElementDiv)
  }, [])

  return portal
}

export const getElementsToFocus = (parent?: HTMLElement | null): HTMLElement[] => {
  if (!parent) return []

  const elements = Array.from(
    parent.querySelectorAll('a[href], button, input, textarea, select, details,[tabindex]')
  )
  const focusableElements = elements.filter(
    el =>
      el.getAttribute('tabindex') !== '-1' &&
      !el.hasAttribute('disabled') &&
      !el.getAttribute('aria-hidden')
  )
  const sortedElements = focusableElements.sort((a, b) => {
    const aIndex = Number(a.getAttribute('tabindex')) || 0
    const bIndex = Number(b.getAttribute('tabindex')) || 0

    if (aIndex === bIndex) return 0
    if (aIndex === 0) return 1
    if (bIndex === 0) return -1

    return aIndex < bIndex ? -1 : 1
  })

  return sortedElements as HTMLElement[]
}

export const nextFocusToElement = (elements: HTMLElement[], enableShift = false) => {
  const currentIndexElement = elements.findIndex(e => e === document.activeElement)
  let nextIndexElement = 0

  if (currentIndexElement > -1) {
    if (enableShift) {
      nextIndexElement = currentIndexElement > 0 ? currentIndexElement - 1 : elements.length - 1
    } else {
      nextIndexElement = currentIndexElement < elements.length - 1 ? currentIndexElement + 1 : 0
    }
  }

  elements[nextIndexElement]?.focus()
}
