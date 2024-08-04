'use client'

import UserButton from '@/components/auth/UserButton'
import { LinkButton } from '@/components/ui/linkButton'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Navbar() {
    const pathname = usePathname()
    return (
        <nav className='bg-secondary flex justify-between items-center p-4 rounded-md max-[600px] w-full shadow-md'>
            <div className="flex gap-x-2">
                <LinkButton href='/server' variant={pathname==='/server'?'default':'link'}>
                    Server
                </LinkButton>
                <LinkButton href='/client' variant={pathname==='/client'?'default':'link'}>
                    Client
                </LinkButton>
                <LinkButton href='/admin' variant={pathname==='/admin'?'default':'link'}>
                    Admin
                </LinkButton>
                <LinkButton href='/profile' variant={pathname==='/profile'?'default':'link'}>
                    Profile
                </LinkButton>
            </div>
            <UserButton/>
        </nav>
    )
}
