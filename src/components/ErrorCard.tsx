import React from 'react'
import { Card, CardFooter, CardHeader } from './ui/card'
import AuthHeader from '@/components/auth/AuthHeader'
import { LinkButton } from './ui/linkButton'

export default function ErrorCard() {
  return (
    <Card className='w-[400px] shadow-md'>
      <CardHeader>
        <AuthHeader label='Oops! Something went wrong!' />
      </CardHeader>
      <CardFooter>
        <LinkButton href='/auth/login'>Back to Login</LinkButton>
      </CardFooter>
    </Card>
  )
}
