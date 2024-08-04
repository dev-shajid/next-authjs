import { auth } from "@/auth"


export const getCurrentRole = async () => {
    const session = await auth()
    return session?.user?.role
}


export const getCurrentUser = async () => {
    const session = await auth()
    return session?.user
}