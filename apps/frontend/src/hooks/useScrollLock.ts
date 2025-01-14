import { useEffect } from 'react'

export const useScrollLock = (isLock: boolean, isUseOriginalStyle = false): void => {
  useEffect((): (() => void) => {
    const originalStyle: string = window.getComputedStyle(document.body).overflow

    if (isLock) {
      document.body.style.overflow = 'hidden'
    }

    return () => (document.body.style.overflow = isUseOriginalStyle ? originalStyle : 'visible')
  }, [isLock, isUseOriginalStyle])
}
