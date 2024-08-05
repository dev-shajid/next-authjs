'use server'

import ApiError from "@/lib/ApiError"
import { CurrentUser } from "@/lib/authUser.server"
import { db } from "@/lib/db"
import { ProfileSchema } from "@/schema/profile.schema"
import { z } from "zod"
import { getUserById } from "./auth.controler"
import ApiResponse from "@/lib/ApiResponse"
import AsyncHandler from "@/lib/AsyncHandler"


export const profile = AsyncHandler(async (values: z.infer<typeof ProfileSchema>) => {
    console.log(values)
    const validateFields = ProfileSchema.safeParse(values)

    if (!validateFields.success) return ApiError(400, "Invalid Credentials", validateFields.error.errors)

    const user = await CurrentUser()
    if (!user) return ApiError(403, "Unauthorized")

    const { data: dbUser, success } = await getUserById(user.id)
    if (!success) return ApiError(403, "Unauthorized")

    await db.user.update({
        where: { id: user.id },
        data: validateFields.data
    })

    return ApiResponse(200, "Updated successfully")
})