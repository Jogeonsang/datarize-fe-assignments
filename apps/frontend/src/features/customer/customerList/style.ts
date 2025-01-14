import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
`

export const TableWrapper = styled.div`
  border: 1px solid #d1d5db;
  border-radius: 8px;
  overflow: hidden;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const TableHead = styled.thead`
  height: 48px;
`

export const TableBody = styled.tbody`
  cursor: pointer;

  tr {
    transition: all 0.2s ease;

    &:hover {
      background-color: #f9fafb;
    }
  }
`

export const SortButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: inherit;
  font-size: inherit;
  color: inherit;
  text-align: inherit;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  background-color: ${(props) => (props.active ? '#f9fafb' : 'transparent')};

  &:hover {
    background-color: #f9fafb;
  }
`

export const TableRow = styled.tr`
  border-bottom: 1px solid #d1d5db;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f9fafb;
  }
`

export const TableCell = styled.td<{ align?: 'right' }>`
  padding: 16px;
  text-align: ${(props) => props.align || 'left'};
  color: #333;
  font-size: 14px;
  white-space: nowrap;
`

export const TableHeader = styled.th<{ align?: 'right' }>`
  padding: 0 16px;
  text-align: ${(props) => props.align || 'left'};
  font-weight: 500;
  color: #666;
  border-bottom: 1px solid #d1d5db;
  font-size: 14px;
  white-space: nowrap;
`

export const SortIcon = styled.span`
  color: #999;
  margin-left: 4px;
  transition: color 0.2s ease;
`

export const InputWrapper = styled.div`
  display: flex;
  gap: 8px;
`

export const Button = styled.button`
  width: 48px;
  height: 38px;
  border: none;
  background: black;
  cursor: pointer;
  border-radius: 8px;
  color: white;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #333;
  }

  &:active {
    background-color: #1a1a1a;
  }
`

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px 0;
`

export const ErrorMessage = styled.p`
  color: #666;
  margin: 0;
`

export const RetryButton = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: #000;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #333;
  }

  &:active {
    background-color: #1a1a1a;
  }
`

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
