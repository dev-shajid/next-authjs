'use server'

import { getCurrentRole } from "@/lib/authUser.server"
import { UserRole } from "@prisma/client"

export const admin = async () => {
    const role = await getCurrentRole()

    if (role === UserRole.ADMIN) {
        return { message: "Allowed API rote", status: 200, ok:true }
    }
    return { message: "Forbidden API route", status: 403, ok:false }
}