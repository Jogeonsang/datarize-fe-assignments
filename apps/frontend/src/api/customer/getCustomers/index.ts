import { safeGet } from '~/lib'
import { z } from 'zod'
import { CustomerSchema } from './type'

export interface GetCustomersParams {
  sortBy?: 'asc' | 'desc'
  name?: string
}

export const getCustomers = (params?: GetCustomersParams) => {
  const searchParams = new URLSearchParams()

  if (params?.sortBy) {
    searchParams.append('sortBy', params.sortBy)
  }

  if (params?.name) {
    searchParams.append('name', params.name)
  }

  const queryString = searchParams.toString()
  const url = `/api/customers${queryString ? `?${queryString}` : ''}`

  return safeGet(z.array(CustomerSchema))(url)
}
