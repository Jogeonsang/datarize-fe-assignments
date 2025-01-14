import { useSuspenseQuery } from '@tanstack/react-query'
import { getPurchasesByCustomer } from '~/api/customer/getPurchasesByCustomer'

export const usePurchasesByCustomer = (customerId: number) => {
  return useSuspenseQuery({
    queryKey: ['purchasesByCustomer', customerId],
    queryFn: () => getPurchasesByCustomer(customerId),
  })
}
