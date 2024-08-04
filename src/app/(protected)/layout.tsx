import React from 'react'
import Navbar from './_components/Navbar'
import UpdateUser from '@/components/UpdateUser'
import { SessionProvider } from 'next-auth/react'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <main className="flex flex-col mx-2 max-w-[600px] w-full space-y-4 min-h-screen items-center justify-center">
                {/* <UpdateUser /> */}
                <Navbar />
                {children}
            </main>
        </SessionProvider>
    )
}
