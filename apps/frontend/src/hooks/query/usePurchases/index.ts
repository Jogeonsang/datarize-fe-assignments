import { useSuspenseQuery, UseSuspenseQueryOptions } from '@tanstack/react-query'
import { DateRange } from 'react-day-picker'
import { getPurchases } from '~/api/purchase'

type Response = Awaited<ReturnType<typeof getPurchases>>

const PURCHASES_QUERY_KEY = 'purchases'

export const getPurchasesQueryKey = (dateRange?: DateRange) => [PURCHASES_QUERY_KEY, { dateRange }]

export const usePurchases = (
  dateRange?: DateRange,
  options?: Omit<UseSuspenseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) => {
  return useSuspenseQuery({
    queryKey: getPurchasesQueryKey(dateRange),
    queryFn: () => getPurchases(dateRange),
    ...options,
  })
}
