import { useSuspenseQuery, UseSuspenseQueryOptions } from '@tanstack/react-query'
import { getPurchases } from '~/api/purchase/getPurchase'

type Response = Awaited<ReturnType<typeof getPurchases>>

const PURCHASES_QUERY_KEY = 'purchases'

export const getPurchasesQueryKey = (dateRange?: { from?: Date; to?: Date } | undefined) => [
  PURCHASES_QUERY_KEY,
  { dateRange },
]

export const usePurchases = (
  dateRange?: { from?: Date; to?: Date } | undefined,
  options?: Omit<UseSuspenseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) => {
  return useSuspenseQuery({
    queryKey: getPurchasesQueryKey(dateRange),
    queryFn: () => getPurchases(dateRange),
    ...options,
  })
}
