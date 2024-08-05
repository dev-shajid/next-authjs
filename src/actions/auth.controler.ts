'use server'

import bcrypt from 'bcrypt'
import { z } from 'zod'

import { RegisterSchema } from '@/schema/register.schema'
import ApiError, { ApiErrorType } from '@/lib/ApiError'
import { db } from '@/lib/db'
import ApiResponse from '@/lib/ApiResponse'
import AsyncHandler from '@/lib/AsyncHandler'
import { LoginSchema } from '@/schema/login.schema'
import { signIn, unstable_update } from '@/auth'
import { DEFAUTL_AUTH_REDIRECT } from '@/routes'
import { AuthError, Session } from 'next-auth'
import { generateVerificationToken } from '@/lib/token'
import { redirect, RedirectType } from 'next/navigation'
import { sendVerificationEmail } from '@/lib/mail'
import { ResetSchema } from '@/schema/reset.schema'

export const reginsterUser = AsyncHandler(async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values)

    if (!validateFields.success) return ApiError(400, "Invalid Credentials", validateFields.error.errors)

    const { email, password, name } = validateFields.data

    const existUser = await db.user.findUnique({
        where: {
            email,
        }
    })


    const hashedPassword = await bcrypt.hash(password, 10)

    if (!!existUser) {
        if (existUser.emailVerified) throw ApiError(400, "Email already registered!")
        await db.user.update({
            where: {
                email,
            },
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })
    }
    else {
        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })
    }

    // TODO: Email verification
    const verificationToken = await generateVerificationToken(email)

    const mailData = await sendVerificationEmail(email, verificationToken)

    if (!mailData.success) return ApiError(500, mailData.message);
    return ApiResponse(200, "Verification email has been sent")
})


export const loginUser = async (values: z.infer<typeof LoginSchema>, callback?:string | null) => {
    try {
        const validateFields = LoginSchema.safeParse(values)

        if (!validateFields.success) return ApiError(400, "Invalid Credentials", validateFields.error.errors)

        const { email, password } = validateFields.data

        const { data: user, success } = await getUserByEmail(email)

        if (!success || !user || !user?.password) {
            throw new Error("No user found");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return ApiError(400, "Incorrect password");
        }

        if (!user.emailVerified) {
            await db.verificationToken.findFirst({
                where: {
                    email,
                },
            })

            const verificationToken = await generateVerificationToken(email)

            const mailData = await sendVerificationEmail(email, verificationToken)

            if (mailData.success) return ApiResponse(200, "Please check Email for verification");
            return ApiError(500, mailData.message);
        }

        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: true,
            redirectTo: callback || DEFAUTL_AUTH_REDIRECT,
        })

        return ApiResponse(200, "Login success")
    } catch (error) {
        console.log({ LoginError: error })
        if (error instanceof AuthError) {
            return ApiError(400, error.cause?.err?.message)
        }
        throw error
    }
}


export const getUserByEmail = AsyncHandler(async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email,
        }
    })
    if (user) return ApiResponse(200, 'Get User', user)
    throw ApiError(404, 'User not found')
})


export const getUserById = AsyncHandler(async (id: string) => {
    const user = await db.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            emailVerified: true,
        }
    })
    if (user) return ApiResponse(200, 'Get User', user)
    throw ApiError(404, 'User not found')
})