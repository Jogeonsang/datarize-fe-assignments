import { z } from 'zod'

export const PurchaseByCustomerSchema = z.object({
  date: z.string(),
  quantity: z.number(),
  product: z.string(),
  price: z.number(),
  imgSrc: z.string(),
})

export type PurchaseByCustomer = z.infer<typeof PurchaseByCustomerSchema>
