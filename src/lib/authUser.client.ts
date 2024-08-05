import { useSession } from "next-auth/react"


export function CurrentRole() {
    new Promise((resolve, reject) => setTimeout(resolve, 2000))
    const { data, status } = useSession()
    return { role: data?.user.role, status }
}

export function CurrentUser() {
    new Promise((resolve, reject) => setTimeout(resolve, 2000))
    const { data, status } = useSession()
    return { user: data?.user, status }
}