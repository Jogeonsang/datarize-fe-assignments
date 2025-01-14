import styled from '@emotion/styled'

export const PurchasesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const PurchaseItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

export const PurchaseItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`

export const PurchaseItemText = styled.p`
  font-size: 12px;
  font-weight: 500;
`
export const PurchaseItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const ProductName = styled(PurchaseItemText)`
  font-size: 14px;
  font-weight: 500;
`

export const ProductPrice = styled(PurchaseItemText)`
  font-size: 14px;
  font-weight: 600;
`

export const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
  font-size: 14px;
`
