import ApiError, { ApiErrorType } from "./ApiError"

export default function AsyncHandler(fn: Function) {
    // return function with defautl argument that accepts a function
    return async function (...args: any) {
        try {
            return await fn(...args)
        } catch (error) {
            console.error({ AsyncHandlerError: error })
            let errorResponse = error as ApiErrorType
            if (error instanceof Error) errorResponse = ApiError(500, error.message, error)
            return errorResponse
        }
    }
}