import styled from '@emotion/styled'
import { Skeleton } from '~/components/skeleton'

function CustomerListLoading() {
  return (
    <Container>
      <InputWrapper>
        <Skeleton width="100%" height="38px" />
        <Skeleton width="40px" height="38px" />
      </InputWrapper>
      <TableWrapper>
        {Array.from({ length: 6 }).map((_, index) => (
          <Table key={index}>
            <Skeleton width="15%" height="38px" />
            <Skeleton width="25%" height="38px" />
            <Skeleton width="45%" height="38px" />
            <Skeleton width="20%" height="38px" />
          </Table>
        ))}
      </TableWrapper>
    </Container>
  )
}

export default CustomerListLoading

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px;
`

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`

const TableWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const Table = styled.div`
  display: flex;
  gap: 8px;
`
