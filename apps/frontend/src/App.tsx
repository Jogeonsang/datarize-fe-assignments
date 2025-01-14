import { Suspense } from 'react'
import Purchase from './features/purchase'
import PurchaseLoading from './features/purchase/loading'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from './components/error-boundary'
import PurchaseError from './features/purchase/error'

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
    </div>
  )
}

export default App
