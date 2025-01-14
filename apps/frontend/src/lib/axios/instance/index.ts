import axios, { AxiosError, AxiosResponse } from 'axios'
import { ApiException } from '../exception'
import { ApiFailureResponse, ApiResponse } from '../type'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:4000',
})

const interceptorResponseFulfilled = (res: AxiosResponse) => {
  if (200 <= res.status && res.status < 300) {
    return res.data
  }

  return Promise.reject(res.data)
}

const interceptorResponseRejected = (error: AxiosError<ApiFailureResponse>) => {
  if (error.response) {
    // HTTP 에러 상태 코드에 따른 처리
    switch (error.response.status) {
      case 404:
        return Promise.reject(new ApiException('NOT_FOUND'))
      case 400:
        return Promise.reject(new ApiException('BAD_REQUEST'))
      case 401:
        return Promise.reject(new ApiException('UNAUTHORIZED'))
      case 403:
        return Promise.reject(new ApiException('FORBIDDEN'))
      case 500:
        return Promise.reject(new ApiException('INTERNAL_SERVER_ERROR'))
      case 503:
        return Promise.reject(new ApiException('SERVICE_UNAVAILABLE'))
      case 504:
        return Promise.reject(new ApiException('GATEWAY_TIMEOUT'))
    }
  }

  if (error.code === 'ECONNABORTED') {
    return Promise.reject(new ApiException('NETWORK_TIMEOUT'))
  }

  if (error.code === 'ERR_NETWORK') {
    return Promise.reject(new ApiException('NETWORK_ERROR'))
  }

  return Promise.reject(new ApiException('UNKNOWN_ERROR'))
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
