import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getDefaultOptions } from '~lib/react-query/defaultOptions'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '~lib/style/reset.css'

const queryClient = new QueryClient({
  defaultOptions: getDefaultOptions(),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
