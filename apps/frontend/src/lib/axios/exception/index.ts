import type { ErrorSchema } from '../type'

type CustomErrorCode =
  | 'NETWORK_ERROR'
  | 'NETWORK_TIMEOUT'
  | 'UNKNOWN_ERROR'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'INTERNAL_SERVER_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'GATEWAY_TIMEOUT'

const ERROR_MESSAGE: Record<CustomErrorCode, string> = {
  NETWORK_ERROR: 'Network error',
  NETWORK_TIMEOUT: 'Network timeout',
  UNKNOWN_ERROR: 'Unknown error',
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden access',
  NOT_FOUND: 'Resource not found',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  SERVICE_UNAVAILABLE: 'Service unavailable',
  GATEWAY_TIMEOUT: 'Gateway timeout',
}

export class ApiException extends Error {
  declare code: number | CustomErrorCode
  declare errors?: ErrorSchema

  constructor(data: ErrorSchema | CustomErrorCode, message?: string) {
    if (typeof data === 'string') {
      // CustomException 형태의 호출
      const errorMessage = message || ERROR_MESSAGE[data]
      super(errorMessage)
      this.code = data
    } else {
      // ApiException 형태의 호출
      super(data.message)
      this.code = data.code
      this.errors = data
    }

    this.name = 'ApiException'
  }
}
