export type ApiSuccessResponse<T> = T

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiFailureResponse

export interface ApiFailureResponse {
  message: 'FAILURE'
  code: null
  data: null
  errors: ErrorSchema
}

export interface ErrorSchema {
  code: number
  message: string
}
