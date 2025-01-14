import { z } from 'zod'

export const PurchaseSchema = z.object({
  range: z.string(),
  count: z.number(),
})

export type Purchase = z.infer<typeof PurchaseSchema>
