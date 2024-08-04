import NewPasswordForm from '@/components/auth/NewPasswordForm'
import { notFound } from 'next/navigation'
import React from 'react'

export default function ResetPage({ searchParams }: { searchParams: { token: string } }) {

  const token = searchParams.token!

  if (!token) notFound()
  return (
    <NewPasswordForm token={token} />
  )
}