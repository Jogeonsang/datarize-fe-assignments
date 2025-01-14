import styled from '@emotion/styled'
import { Skeleton } from '~/components/skeleton'

function PurchasesListLoading() {
  return (
    <Container>
      {Array.from({ length: 3 }).map((_, index) => (
        <Item key={index}>
          <Skeleton width="80px" height="80px" />
          <Info>
            <Skeleton width="120px" height="18px" />
            <Skeleton width="80px" height="18px" />
            <Skeleton width="100px" height="14px" />
          </Info>
        </Item>
      ))}
    </Container>
  )
}

export default PurchasesListLoading

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const Item = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`
