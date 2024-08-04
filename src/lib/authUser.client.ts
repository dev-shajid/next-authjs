import { useSession } from "next-auth/react"


export function getCurrentRole() {
    new Promise((resolve, reject) => setTimeout(resolve, 2000))
    const { data, status } = useSession()
    return { role: data?.user.role, status }
}

export function getCurrentUser() {
    new Promise((resolve, reject) => setTimeout(resolve, 2000))
    const { data, status } = useSession()
    return { user: data?.user, status }
}