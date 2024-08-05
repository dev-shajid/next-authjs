'use client'

import React, { useCallback, useEffect, useState, useTransition } from 'react'
import CardWrapper from './CardWrapper'
import { BeatLoader } from 'react-spinners'
import FormToast from '@/components/FormToast'
import { notFound, redirect, RedirectType } from 'next/navigation'
import { ApiResponseType } from '@/lib/ApiResponse'
import { ApiErrorType } from '@/lib/ApiError'
import { newVerification } from '@/actions/verificationToken.controler'
import { DEFAUTL_AUTH_REDIRECT } from '@/routes'

export default function NewVerificationForm({ token }: { token?: string }) {
    const [isPending, setTransition] = useTransition()
    const [data, setData] = useState<ApiErrorType | ApiResponseType | undefined>(undefined)

    const onSubmit = useCallback(() => {
        if (!token) return
        setTransition(async () => {
            const res = await newVerification(token)
            if(res.success) redirect(DEFAUTL_AUTH_REDIRECT, RedirectType.push)
            if (res) setData(res)
        })
    }, [token])

    useEffect(() => {
        onSubmit()
    }, [token])

    if (!token) notFound()

    return (
        <CardWrapper
            headerLabel='Confirming your verification'
            backButtonHref='/auth/login'
            backButtonLabel='Back to login'
        >
            <div className='flex flex-col items-center justify-center w-full space-y-3'>
                {
                    isPending ?
                        <BeatLoader /> :
                        (data && <FormToast
                            success={data?.success ?? true}
                            message={data?.message}
                        />)
                }
            </div>
        </CardWrapper>
    )
}
