export type ApiSuccessResponse<T> = T

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiFailureResponse

export type ApiFailureResponse = {
  message: 'FAILURE'
  code: null
  data: null
  errors: ErrorSchema
}

export type ErrorSchema = {
  code: number
  message: string
}
