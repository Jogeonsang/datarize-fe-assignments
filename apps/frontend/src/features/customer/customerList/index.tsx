import { useState, useCallback, useEffect, useMemo } from 'react'
import { useCustomersSearch, useCustomersSearchResult } from '~/hooks/query/useCustomers'
import { AArrowUp, AArrowDown } from '@mynaui/icons-react'
import Input from '~/components/input'
import { match, P } from 'ts-pattern'

import PurchasesByCustomer from '../purchasesByCustomer'
import CustomerListEmpty from './empty'
import CustomerListError from './error'
import CustomerListLoading from './loading'
import { GetCustomersParams } from '~/api/customer/getCustomers'

import * as S from './style'

function CustomerList() {
  const [name, setName] = useState<string>('')
  const [sortBy, setSortBy] = useState<GetCustomersParams['sortBy']>(undefined)
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)
  const { data, error: searchError } = useCustomersSearchResult()
  const { mutate: searchCustomers, isPending: isSearching, error: searchCustomersError } = useCustomersSearch()

  const handleSearch = useCallback(() => {
    searchCustomers({ name, sortBy })
  }, [searchCustomers, name, sortBy])

  const handleRowClick = (customerId: number) => {
    setSelectedCustomerId(customerId)
  }

  const handleSortClick = () => {
    setSortBy((prev) => {
      if (!prev) return 'asc'
      if (prev === 'asc') return 'desc'
      return undefined
    })
  }
  const renderCustomerRows = useCallback((customers: typeof data) => {
    return customers.map((customer) => (
      <S.TableRow key={customer.id} onClick={() => handleRowClick(customer.id)} style={{ cursor: 'pointer' }}>
        <S.TableCell>{customer.id}</S.TableCell>
        <S.TableCell>{customer.name}</S.TableCell>
        <S.TableCell>{customer.totalAmount.toLocaleString()}원</S.TableCell>
        <S.TableCell>{customer.count}</S.TableCell>
      </S.TableRow>
    ))
  }, [])

  const renderContent = useMemo(() => {
    const hasError = searchError !== null || searchCustomersError !== null

    return match({ data, hasError, isSearching })
      .with({ isSearching: true }, () => (
        <td colSpan={4}>
          <CustomerListLoading />
        </td>
      ))
      .with({ hasError: true }, () => (
        <td colSpan={4}>
          <CustomerListError reset={handleSearch} />
        </td>
      ))
      .with({ data: [] }, () => <CustomerListEmpty />)
      .with({ data: P.array(P.any) }, ({ data: customers }) => renderCustomerRows(customers))
      .exhaustive()
  }, [data, searchError, searchCustomersError, isSearching, handleSearch, renderCustomerRows])

  useEffect(() => {
    if (!sortBy) return
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
            if (e.key === 'Enter') {
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
          <S.TableBody>{renderContent}</S.TableBody>
        </S.Table>
      </S.TableWrapper>

      <PurchasesByCustomer
        customerId={selectedCustomerId}
        isOpen={selectedCustomerId !== null}
        onClose={() => setSelectedCustomerId(null)}
      />
    </S.Container>
  )
}

export default CustomerList
