import { safeGet } from '~/lib'
import { z } from 'zod'
import { PurchaseSchema } from './type'
import { startOfDay, endOfDay, formatISO } from 'date-fns'

export type DateRange = {
  from?: Date
  to?: Date
}

export const getPurchases = (dateRange?: DateRange) => {
  const params: Record<string, string> = {}

  if (dateRange?.from) {
    params.from = formatISO(startOfDay(dateRange.from))
  }

  if (dateRange?.to) {
    params.to = formatISO(endOfDay(dateRange.to))
  }

  const queryString = new URLSearchParams(params).toString()
  return safeGet(z.array(PurchaseSchema))(`/api/purchase-frequency${queryString ? `?${queryString}` : ''}`)
}
