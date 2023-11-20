import { useEffect, useState } from 'react'

import s from './scroll-to-top-button.module.scss'

import ArrowUpCircle from '@/assets/icons/arrow-up-circle.tsx'

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <div className={s.scroll_to_top}>
          <ArrowUpCircle onClick={handleButtonClick} />
        </div>
      )}
    </>
  )
}
