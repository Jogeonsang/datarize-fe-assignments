import { useState, useEffect, useCallback } from 'react'
import { GetCustomersParams } from '~/api/customer/getCustomers'
import { useCustomersSearch, useCustomersSearchResult } from '~/hooks/query/useCustomers'
import { AArrowUp, AArrowDown } from '@mynaui/icons-react'
import Input from '~/components/input'
import { match, P } from 'ts-pattern'
import { ApiException } from '~/lib'

import * as S from './style'

function CustomerList() {
  const [sortBy, setSortBy] = useState<GetCustomersParams['sortBy']>(undefined)
  const [name, setName] = useState<string>('')

  const { mutate: searchCustomers, error: searchError } = useCustomersSearch()
  const { data } = useCustomersSearchResult()

  const handleSearch = useCallback(() => {
    searchCustomers({ sortBy, name })
  }, [searchCustomers, sortBy, name])

  const handleSortClick = () => {
    setSortBy((prev) => {
      if (!prev) return 'asc'
      if (prev === 'asc') return 'desc'
      return undefined
    })
  }

  useEffect(() => {
    handleSearch()
  }, [sortBy])

  return (
    <S.Container>
      <S.InputWrapper>
        <Input
          placeholder="고객명 검색"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault()
              handleSearch()
            }
          }}
        />
        <S.Button onClick={handleSearch}>검색</S.Button>
      </S.InputWrapper>

      <S.TableWrapper>
        <S.Table>
          <S.TableHead>
            <S.TableRow>
              <S.TableHeader>ID</S.TableHeader>
              <S.TableHeader>고객명</S.TableHeader>
              <S.TableHeader>
                <S.SortButton active={!!sortBy} onClick={handleSortClick}>
                  총 구매 금액
                  {sortBy && <S.SortIcon>{sortBy === 'desc' ? <AArrowDown /> : <AArrowUp />}</S.SortIcon>}
                </S.SortButton>
              </S.TableHeader>
              <S.TableHeader>구매 횟수</S.TableHeader>
            </S.TableRow>
          </S.TableHead>
          <S.TableBody>
            {match({ data, error: searchError })
              .with({ error: P.not(P.nullish) }, ({ error }) => (
                <S.EmptyRow>
                  <S.EmptyCell colSpan={4}>
                    <S.ErrorContainer>
                      <S.ErrorMessage>
                        <p>정보를 불러오는중에 문제가 발생했어요.</p>
                        {error instanceof ApiException ? error.message : '오류가 발생했습니다. 다시 시도해주세요.'}
                      </S.ErrorMessage>
                      <S.RetryButton onClick={handleSearch}>다시 검색해보기</S.RetryButton>
                    </S.ErrorContainer>
                  </S.EmptyCell>
                </S.EmptyRow>
              ))
              .with({ data: P.nullish }, () => (
                <S.EmptyRow>
                  <S.EmptyCell colSpan={4}>데이터를 불러오는 중입니다...</S.EmptyCell>
                </S.EmptyRow>
              ))
              .with({ data: [] }, () => (
                <S.EmptyRow>
                  <S.EmptyCell colSpan={4}>검색 결과가 없습니다.</S.EmptyCell>
                </S.EmptyRow>
              ))
              .with({ data: P.array(P.any) }, ({ data: customers }) =>
                customers.map((customer) => (
                  <S.TableRow key={customer.id}>
                    <S.TableCell>{customer.id}</S.TableCell>
                    <S.TableCell>{customer.name}</S.TableCell>
                    <S.TableCell>{customer.totalAmount.toLocaleString()}원</S.TableCell>
                    <S.TableCell>{customer.count}</S.TableCell>
                  </S.TableRow>
                )),
              )
              .exhaustive()}
          </S.TableBody>
        </S.Table>
      </S.TableWrapper>
    </S.Container>
  )
}

export default CustomerList
