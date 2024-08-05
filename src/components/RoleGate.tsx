'use client'

import { UserRole } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import FormToast from './FormToast'
import { CurrentRole } from '@/lib/authUser.client'
import { Skeleton } from './ui/skeleton'

interface RoleGateProps {
    children?: React.ReactNode
    allowedRole: UserRole
}

export default function RoleGate({ children, allowedRole }: RoleGateProps) {
    const { role, status } = CurrentRole()

    if (status === 'loading') return <div className='w-full rounded-md bg-muted p-3'><Skeleton className='w-52 h-4 rounded-md' /></div>
    else if (allowedRole !== role) {
        return <FormToast message="You are not authorized to view this page" success={false} />
    }
    return (
        <>
            {children}
        </>
    )
}
