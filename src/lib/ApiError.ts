export default function ApiError(
    status: number,
    message?: string,
    errors?: any,
):ApiErrorType {
    return {
        status: status || 404,
        message: message || 'Something went wrong!',
        errors: errors || null,
        success: false,
    }
}

export interface ApiErrorType {
    status: number
    message: string
    errors: any
    success: boolean
}