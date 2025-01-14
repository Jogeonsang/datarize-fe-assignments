import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Skeleton } from '~/components/skeleton'

function PurchaseLoading() {
  return (
    <Container>
      <div
        css={css`
          margin-left: auto;
        `}
      >
        <Skeleton width="210px" height="32px" />
      </div>
      <ChartContainer>
        {Array.from({ length: 9 }).map((_, index) => {
          const heights = [32, 80, 110, 100, 180, 220, 260, 300, 140]
          const height = heights[index]

          return <Skeleton key={index} width="100%" height={`${height}px`} />
        })}
      </ChartContainer>
    </Container>
  )
}

export default PurchaseLoading

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
`

const ChartContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 0 12px;

  height: 400px;
`
