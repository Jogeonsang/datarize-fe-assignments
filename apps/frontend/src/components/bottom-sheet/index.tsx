import styled from '@emotion/styled'
import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useScrollLock } from '~/hooks'
import Portal from '../portal'
import { SerializedStyles } from '@emotion/react'

type BottomSheetProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  bottomSheetStyle?: SerializedStyles
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children, bottomSheetStyle }) => {
  useScrollLock(isOpen)
  const nodeRef = useRef(null)
  const overlayRef = useRef(null)

  return (
    <Portal>
      <CSSTransition in={isOpen} timeout={300} classNames="overlay" unmountOnExit nodeRef={overlayRef}>
        <Overlay ref={overlayRef} onClick={onClose} />
      </CSSTransition>
      <CSSTransition in={isOpen} timeout={300} classNames="bottom-sheet" unmountOnExit nodeRef={nodeRef}>
        <Sheet ref={nodeRef} onClick={(e) => e.stopPropagation()} css={bottomSheetStyle}>
          {children}
        </Sheet>
      </CSSTransition>
    </Portal>
  )
}

export default BottomSheet

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
  opacity: 0;
  transition: opacity 300ms ease-in-out;

  &.overlay-enter {
    opacity: 0;
  }
  &.overlay-enter-active {
    opacity: 1;
  }
  &.overlay-enter-done {
    opacity: 1;
  }
  &.overlay-exit {
    opacity: 1;
  }
  &.overlay-exit-active {
    opacity: 0;
  }
`

const Sheet = styled.div`
  background: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  width: 100%;
  max-width: 100%;
  padding: 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  z-index: 51;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  transition: transform 300ms ease-in-out;

  &.bottom-sheet-enter {
    transform: translateX(-50%) translateY(100%);
  }
  &.bottom-sheet-enter-active {
    transform: translateX(-50%) translateY(0);
  }
  &.bottom-sheet-enter-done {
    transform: translateX(-50%) translateY(0);
  }
  &.bottom-sheet-exit {
    transform: translateX(-50%) translateY(0);
  }
  &.bottom-sheet-exit-active {
    transform: translateX(-50%) translateY(100%);
  }
`
