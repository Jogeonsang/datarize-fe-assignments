import { Suspense } from 'react'
import Purchase from './features/purchase'
import PurchaseLoading from './features/purchase/loading'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from './components/error-boundary'
import PurchaseError from './features/purchase/error'
import CustomerList from './features/customer/customerList'
import CustomerListLoading from './features/customer/customerList/loading'
import CustomerListError from './features/customer/customerList/error'

function App() {
  return (
    <div>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} renderFallback={({ reset }) => <PurchaseError reset={reset} />}>
            <Suspense fallback={<PurchaseLoading />}>
              <Purchase />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            renderFallback={({ reset }) => {
              return <CustomerListError reset={reset} />
            }}
          >
            <Suspense fallback={<CustomerListLoading />}>
              <CustomerList />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  )
}

export default App
