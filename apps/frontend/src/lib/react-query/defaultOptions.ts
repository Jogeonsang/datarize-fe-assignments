import type { DefaultOptions } from '@tanstack/react-query'

const isProd = process.env.NODE_ENV === 'production'

const defaultOptions: DefaultOptions = {
  queries: {
    retry: isProd ? 3 : false,
    staleTime: 60 * 1000,
    throwOnError: true,
  },
}

export const getDefaultOptions = (overrideOptions?: DefaultOptions) => {
  return {
    ...defaultOptions,
    ...overrideOptions,
  }
}
