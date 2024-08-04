'use server'

import ApiError from "@/lib/ApiError"
import ApiResponse from "@/lib/ApiResponse"
import AsyncHandler from "@/lib/AsyncHandler"
import { db } from "@/lib/db"
import { getUserByEmail } from "./auth.controler"
import { ResetSchema } from "@/schema/reset.schema"
import { z } from "zod"
import { generatePasswordResetToken } from "@/lib/token"
import { sendPasswordResetEmail } from "@/lib/mail"
import { NewPasswordSchema } from "@/schema/newPassword.schema"
import bcrypt from "bcryptjs"


export const reset = AsyncHandler(async (values: z.infer<typeof ResetSchema>) => {
    const validateFields = ResetSchema.safeParse(values)

    if (!validateFields.success) return ApiError(400, "Invalid Credentials", validateFields.error.errors)

    const { email } = validateFields.data

    const { data: user, success } = await getUserByEmail(email)

    if (!success) return ApiError(400, "No user found");

    const token = await generatePasswordResetToken(email)
    const mailData = await sendPasswordResetEmail(email, token)

    if (mailData.success) return ApiResponse(200, "Reset email has been sent");
    return ApiError(500, mailData.message);
})

export const newPassword = AsyncHandler(async (values: z.infer<typeof NewPasswordSchema>, token: string) => {
    if (!token) return ApiError(400, "Missing Token")

    const validateFields = NewPasswordSchema.safeParse(values)

    if (!validateFields.success) return ApiError(400, "Invalid Credentials", validateFields.error.errors)

    const { password } = validateFields.data

    const { data: existingToken, success } = await getPasswordResetTokenByToken(token)

    if (!success) return ApiError(400, "Token does not exist")

    const hasExpired = new Date() > existingToken.expires

    if (hasExpired) return ApiError(400, "Token has expired")

    const existingUser = await db.user.findFirst({
        where: {
            email: existingToken?.email,
        }
    })

    if (!existingUser) return ApiError(400, "User does not exist")

    const isPasswordMatch = await bcrypt.compare(password, existingUser?.password!)

    if (isPasswordMatch) return ApiError(400, "Password cannot be the same as the old password")

    await db.user.update({
        where: { id: existingUser?.id },
        data: {
            password: await bcrypt.hash(password, 10)
        }
    })

    await db.passwordResetToken.delete({
        where: { id: existingToken?.id }
    })

    return ApiResponse(200, "Password has been reset")
})

export const getPasswordResetTokenByToken = AsyncHandler(async (token: string) => {
    const passwordToekn = await db.passwordResetToken.findUnique({
        where: {
            token,
        }
    })

    if (!passwordToekn) return ApiError(404, "Invalid Token")
    return ApiResponse(200, "Password reset token", passwordToekn)
})

export const getPasswordResetTokenByEmail = AsyncHandler(async (email: string) => {
    const passwordToekn = await db.passwordResetToken.findFirst({
        where: {
            email,
        }
    })

    if (!passwordToekn) return ApiError(404, "Invalid Token")
    return ApiResponse(200, "Password reset token", passwordToekn)
})