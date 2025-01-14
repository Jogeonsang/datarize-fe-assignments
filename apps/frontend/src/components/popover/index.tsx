import { ReactNode, useEffect, useRef, useState } from 'react'
import * as S from './style'

type PopoverProps = {
  trigger: ReactNode
  content: ReactNode
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

function Popover({ trigger, content, isOpen: controlledIsOpen, onOpenChange }: PopoverProps) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const isOpen = controlledIsOpen ?? uncontrolledIsOpen
  const handleOpenChange = (nextIsOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(nextIsOpen)
    } else {
      setUncontrolledIsOpen(nextIsOpen)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        handleOpenChange(false)
      }
    }

    const adjustPosition = () => {
      if (!contentRef.current || !popoverRef.current) return

      const popoverRect = popoverRef.current.getBoundingClientRect()
      const contentRect = contentRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth

      let top = popoverRect.bottom
      let left = popoverRect.left

      if (window.innerWidth <= 768) {
        top = viewportHeight - contentRect.height
        left = 0
        contentRef.current.style.width = '100%'
      } else {
        if (top + contentRect.height > viewportHeight) {
          top = popoverRect.top - contentRect.height
        }

        if (left + contentRect.width > viewportWidth) {
          left = viewportWidth - contentRect.width - 16
        }

        if (left < 0) {
          left = 16
        }
      }

      contentRef.current.style.position = 'fixed'
      contentRef.current.style.top = `${top}px`
      contentRef.current.style.left = `${left}px`
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      window.addEventListener('scroll', adjustPosition)
      window.addEventListener('resize', adjustPosition)
      adjustPosition()
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      window.removeEventListener('scroll', adjustPosition)
      window.removeEventListener('resize', adjustPosition)
    }
  }, [isOpen])

  return (
    <S.Container ref={popoverRef}>
      <S.Trigger onClick={() => handleOpenChange(!isOpen)}>{trigger}</S.Trigger>
      {isOpen && <S.Content ref={contentRef}>{content}</S.Content>}
    </S.Container>
  )
}

export default Popover
