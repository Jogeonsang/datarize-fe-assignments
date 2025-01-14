import { Suspense } from 'react'
import BottomSheet from '~/components/bottom-sheet'

import PurchasesList from './PurchasesList'
import PurchasesListLoading from './loading'
import { ErrorBoundary } from '~/components/error-boundary'
import PurchasesByCustomerError from './error'
import { QueryErrorResetBoundary } from '@tanstack/react-query'

interface PurchasesByCustomerProps {
  customerId: number | null
  onClose: () => void
  isOpen: boolean
}

function PurchasesByCustomer({ customerId, onClose, isOpen }: PurchasesByCustomerProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {isOpen && customerId && (
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} renderFallback={({ reset }) => <PurchasesByCustomerError reset={reset} />}>
              <Suspense fallback={<PurchasesListLoading />}>
                <PurchasesList customerId={customerId} />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      )}
    </BottomSheet>
  )
}

export default PurchasesByCustomer
