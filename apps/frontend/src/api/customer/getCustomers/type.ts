import { z } from 'zod'

export const CustomerSchema = z.object({
  id: z.number(),
  name: z.string(),
  totalAmount: z.number(),
  count: z.number(),
})

export type Customer = z.infer<typeof CustomerSchema>
