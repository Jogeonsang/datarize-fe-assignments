import styled from '@emotion/styled'
import { motion } from 'motion/react'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
}

export const Skeleton = ({ width, height, borderRadius = '4px' }: SkeletonProps) => {
  return (
    <SkeletonBase
      width={width}
      height={height}
      borderRadius={borderRadius}
      animate={{
        opacity: [0.5, 1, 0.5],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        },
      }}
    />
  )
}

const SkeletonBase = styled(motion.div)<SkeletonProps>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  border-radius: ${({ borderRadius }) => (typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius)};
  background-color: #f3f3f3;
`
