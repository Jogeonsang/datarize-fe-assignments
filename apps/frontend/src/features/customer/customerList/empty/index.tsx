import styled from '@emotion/styled'
import { TableCell, TableRow } from '../style'

function CustomerListEmpty() {
  return (
    <EmptyRow>
      <EmptyCell colSpan={4}>검색 결과가 없습니다.</EmptyCell>
    </EmptyRow>
  )
}

export default CustomerListEmpty

export const EmptyRow = styled(TableRow)`
  &:hover {
    background-color: transparent;
  }
`

export const EmptyCell = styled(TableCell)`
  text-align: center;
  color: #666;
  padding: 48px 0;
`
