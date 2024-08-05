import { auth } from "@/auth"


export const CurrentRole = async () => {
    const session = await auth()
    return session?.user?.role
}


export const CurrentUser = async () => {
    const session = await auth()
    return session?.user
}