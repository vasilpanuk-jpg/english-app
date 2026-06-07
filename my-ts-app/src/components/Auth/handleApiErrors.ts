import { AxiosError } from 'axios'

import { ApiError } from './errors'

type ApiErrorShape = {
    message?: string
    status?: number
    timestamp?: Date
}

export function handleApiError(
    error: unknown
): never {

    const axiosError =
        error as AxiosError<ApiErrorShape>

    throw new ApiError(

        axiosError.response?.data.message
        || axiosError.message
        || 'Unknown error',

        axiosError.response?.status
    )
}