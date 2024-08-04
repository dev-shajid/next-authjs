import React from 'react'
import NewVerificationForm from '@/components/auth/NewVerificationForm'
import { notFound } from 'next/navigation'

export default function VerificationEmail({ searchParams }: { searchParams: { token: string } }) {

  const token = searchParams.token!

  if (!token) notFound()
  return (
    <NewVerificationForm token={token} />
  )
}