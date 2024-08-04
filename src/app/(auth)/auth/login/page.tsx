import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { verified: string; error: string };
}) {
  const isVerified = searchParams.verified === "true";
  const OAuthAccountNotLinked = searchParams.error === "OAuthAccountNotLinked";
  return (
    <LoginForm
      isVerified={isVerified}
      OAuthAccountNotLinked={OAuthAccountNotLinked}
    />
  )
}
