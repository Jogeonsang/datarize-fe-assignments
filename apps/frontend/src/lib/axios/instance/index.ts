import axios, { AxiosError, AxiosResponse } from 'axios'
import { ApiException } from '../exception'
import { ApiFailureResponse, ApiResponse } from '../type'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
})

const interceptorResponseFulfilled = (res: AxiosResponse) => {
  if (200 <= res.status && res.status < 300) {
    return res
  }

  return Promise.reject(res)
}

const interceptorResponseRejected = (error: AxiosError<ApiFailureResponse>) => {
  return Promise.reject(new ApiException(error.response?.data.errors || 'UNKNOWN_ERROR'))
}

instance.interceptors.response.use(interceptorResponseFulfilled, interceptorResponseRejected)

export const get = <T>(...args: Parameters<typeof instance.get>): Promise<ApiResponse<T>> => {
  return instance.get<ApiResponse<T>, ApiResponse<T>>(...args)
}

export const post = <T>(...args: Parameters<typeof instance.post>): Promise<ApiResponse<T>> => {
  return instance.post<ApiResponse<T>, ApiResponse<T>>(...args)
}

export const put = <T>(...args: Parameters<typeof instance.put>): Promise<ApiResponse<T>> => {
  return instance.put<ApiResponse<T>, ApiResponse<T>>(...args)
}

export const patch = <T>(...args: Parameters<typeof instance.patch>): Promise<ApiResponse<T>> => {
  return instance.patch<ApiResponse<T>, ApiResponse<T>>(...args)
}

export const del = <T>(...args: Parameters<typeof instance.delete>): Promise<ApiResponse<T>> => {
  return instance.delete<ApiResponse<T>, ApiResponse<T>>(...args)
}
