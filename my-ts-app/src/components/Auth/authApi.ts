import api from "./client.ts";
import {handleApiError} from "./handleApiErrors.ts";

export type RegisterRequest = {
  email: string
  username: string
  password: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type AuthResponse = {
  accessToken: string
}

export async function register(payload: RegisterRequest): Promise<void> {
  try {
    await api.post(
        '/auth/register',
        payload
    )
  } catch (error) {
    handleApiError(error)
  }
}

export async function login(payload: LoginRequest): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>(
        '/auth/login',
        payload
    )

    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export async function verify(token: string): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>(
        '/auth/verify',
        { token }
    )

    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export async function resendVerification(email: string): Promise<void> {
  try {
    await api.post('/auth/resend', { email })
  } catch (error) {
    handleApiError(error)
  }
}

export async function refresh(): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>(
      '/auth/refresh'
    )

    return response.data
  } catch (error) {
    handleApiError(error)
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout')
  } catch (error) {
    handleApiError(error)
  }
}
