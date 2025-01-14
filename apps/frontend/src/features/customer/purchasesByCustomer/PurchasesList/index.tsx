import { usePurchasesByCustomer } from '~/hooks/query/usePurchasesByCustomer'
import { match, P } from 'ts-pattern'
import * as S from './style'

interface PurchasesListProps {
  customerId: number
}

function PurchasesList({ customerId }: PurchasesListProps) {
  const { data } = usePurchasesByCustomer(customerId)

  return (
    <S.PurchasesList>
      {match(data)
        .with([], () => <S.EmptyState>구매 내역이 없습니다.</S.EmptyState>)
        .with(P.array(P.any), (purchases) =>
          purchases.map((purchase) => (
            <S.PurchaseItem key={purchase.date}>
              <S.PurchaseItemImage src={purchase.imgSrc} alt={`${purchase.product} 상품 이미지`} />
              <S.PurchaseItemInfo>
                <S.ProductName>{purchase.product}</S.ProductName>
                <S.ProductPrice>{purchase.price.toLocaleString()}원</S.ProductPrice>
                <S.PurchaseItemText>
                  {new Date(purchase.date).toLocaleDateString()} / {purchase.quantity}개
                </S.PurchaseItemText>
              </S.PurchaseItemInfo>
            </S.PurchaseItem>
          )),
        )
        .exhaustive()}
    </S.PurchasesList>
  )
}

export default PurchasesList
