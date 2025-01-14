import styled from '@emotion/styled'
import { motion } from 'motion/react'

export const PeriodSelector = styled.div`
  margin-left: auto;
`

export const TabList = styled.div`
  display: inline-flex;
  padding: 4px;
  background-color: #f5f5f5;
  border-radius: 24px;
  position: relative;
  width: fit-content;
`

export const TabBackground = styled(motion.div)`
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const TabItem = styled.button<{ isActive: boolean }>`
  padding: 6px 16px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  z-index: 1;
  background: none;
  color: ${({ isActive }) => (isActive ? '#000' : '#666')};
  transition: color 0.2s;
  width: 100px;
  text-align: center;

  &:hover {
    color: ${({ isActive }) => (isActive ? '#000' : '#333')};
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`

export const DateButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #f5f5f5;
  }
`
