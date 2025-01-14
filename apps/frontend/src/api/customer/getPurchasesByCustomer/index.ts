import { safeGet } from '~/lib'
import { z } from 'zod'
import { PurchaseByCustomerSchema } from './type'

export const getPurchasesByCustomer = (customerId: number) => {
  return safeGet(z.array(PurchaseByCustomerSchema))(`/api/customers/${customerId}/purchases`)
}
