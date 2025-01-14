import { useSuspenseQuery, UseSuspenseQueryOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCustomers } from '~/api/customer/getCustomers'
import { ApiException } from '~/lib/axios/exception'

type Response = Awaited<ReturnType<typeof getCustomers>>
type RequestParams = Parameters<typeof getCustomers>[0]
const CUSTOMERS_QUERY_KEY = 'customers'
const CUSTOMERS_SEARCH_KEY = 'customers-search'

export const getCustomersQueryKey = (params?: RequestParams) => [CUSTOMERS_QUERY_KEY, params]
export const getCustomersSearchKey = () => [CUSTOMERS_SEARCH_KEY]

export const useCustomers = (
  params?: RequestParams,
  options?: Omit<UseSuspenseQueryOptions<Response>, 'queryKey' | 'queryFn'>,
) => {
  return useSuspenseQuery({
    queryKey: getCustomersQueryKey(params),
    queryFn: () => getCustomers(params),
    ...options,
  })
}

export const useCustomersSearch = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: RequestParams) => {
      try {
        return await getCustomers(params)
      } catch (error) {
        if (error instanceof ApiException && error.code === 'NOT_FOUND') {
          return []
        }
        throw error
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(getCustomersSearchKey(), data)
    },
  })
}

export const useCustomersSearchResult = (options?: Omit<UseSuspenseQueryOptions<Response>, 'queryKey'>) => {
  return useSuspenseQuery({
    queryKey: getCustomersSearchKey(),
    queryFn: async () => {
      try {
        return await getCustomers({})
      } catch (error) {
        if (error instanceof ApiException && error.code === 'NOT_FOUND') {
          return []
        }

        throw error
      }
    },
    ...options,
  })
}
