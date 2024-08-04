'use server'

import ApiError from "@/lib/ApiError"
import ApiResponse from "@/lib/ApiResponse"
import AsyncHandler from "@/lib/AsyncHandler"
import { db } from "@/lib/db"
import { signIn } from "next-auth/react"
import { DEFAUTL_AUTH_REDIRECT } from "@/routes"

export const getVerificationTokenByToken = AsyncHandler(async (token: string) => {
    const verificationToken = await db.verificationToken.findUnique({
        where: { token }
    })
    console.log({ verificationToken })
    if (!verificationToken) return ApiResponse(404, "Failed to fetch verification token", verificationToken)
    return ApiResponse(200, "Successfully fetched verification token", verificationToken)
})

export const getVerificationTokenByEmail = AsyncHandler(async (email: string) => {
    const verificationToken = await db.verificationToken.findFirst({
        where: { email }
    })
    console.log({ verificationToken })
    if (!verificationToken) return ApiResponse(404, "Failed to fetch verification token", verificationToken)
    return ApiResponse(200, "Successfully fetched verification token", verificationToken)
})


export const newVerification = AsyncHandler(async (token: string) => {
    const existingToken = await db.verificationToken.findUnique({
        where: {
            token
        }
    })
    if (!existingToken) return ApiError(400, "Token does not exist")

    const hasExpired = new Date() > existingToken.expires;

    if (hasExpired) return ApiError(400, "Token has expired")

    const existingUser = await db.user.findUnique({
        where: {
            email: existingToken.email,
        }
    })

    if (!existingUser) return ApiError(400, "User does not exist")

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await db.verificationToken.delete({
        where: { id: existingToken.id }
    })

    await signIn("credentials", {
        email: existingToken.email,
        redirect: true,
        redirectTo: DEFAUTL_AUTH_REDIRECT,
    })

    return ApiResponse(200, "Email Verified",)
})