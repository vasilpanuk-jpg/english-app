import axios from 'axios'
import { deleteCookie, getCookie, setCookie } from './cookies.ts'

type RefreshResponse = {
  accessToken: string
}

const api = axios.create({

    baseURL:
    import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,

    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    config => {

        const token =
      getCookie('accessToken')

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`
        }

        return config
    }
)

api.interceptors.response.use(

  response => response,

  async error => {

    const originalRequest = error.config as (typeof error.config & { _retry?: boolean })

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !String(originalRequest.url || '').includes('/auth/refresh') &&
      !String(originalRequest.url || '').includes('/auth/login') &&
      !String(originalRequest.url || '').includes('/auth/register') &&
      !String(originalRequest.url || '').includes('/auth/verify')
    ) {
      originalRequest._retry = true

      try {
        const refreshResponse = await api.post<RefreshResponse>('/auth/refresh')
        const response = refreshResponse.data

        if (response.accessToken) {
          setCookie('accessToken', response.accessToken)
          originalRequest.headers.Authorization = `Bearer ${response.accessToken}`
        }

        return api(originalRequest)
      } catch {
        deleteCookie('accessToken')
        window.location.href = '/login'
      }
    }

    if (
      error.response?.status === 401
    ) {

      deleteCookie('accessToken')

      window.location.href =
        '/login'
    }

    return Promise.reject(error)
  }
)

export default api;