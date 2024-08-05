'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getUserById } from '@/actions/auth.controler'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'

export default function UpdateUser() {
    const { data, status, update }: { data: Session | null, status: string, update: Function } = useSession()
    const [hasCalledUpdate, setHasCalledUpdate] = useState(false);

    const router = useRouter()

    const user: any = data?.user

    async function updateUsername(id: string) {
        if (!user) return
        const userData = await getUserById(id)
        if (!userData) return;
        let newData: any = {};

        ['name', 'role'].forEach((key) => {
            if (user[key] != userData.data[key]) {
                newData[key] = userData.data[key]
            }
        })
        if (Object.keys(newData).length == 0) return;
        await update(newData)
        setHasCalledUpdate(true)
        router.refresh()

    }

    useEffect(() => {
        if (status === 'authenticated' && !hasCalledUpdate) {
            updateUsername(user?.id!)
                .then(() => {
                    console.log('Updated')
                })
                .finally(() => setHasCalledUpdate(true))
        }
    }, [status, user?.id, hasCalledUpdate])

    return null
}

