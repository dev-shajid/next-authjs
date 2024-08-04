'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import AuthHeader from '@/components/auth/AuthHeader'
import SocialButtons from './SocialButtons'
import { LinkButton } from '@/components/ui/linkButton'

interface CardWrapperProps {
  children?: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
  isPending?: boolean
}

export default function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial = false,
  isPending = false
}: CardWrapperProps) {
  return (
    <Card className='max-w-[400px] w-full mx-3'>
      <CardHeader>
        <AuthHeader
          label={headerLabel}
        />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <SocialButtons isPending={isPending} />
        </CardFooter>
      )}
      <CardFooter className='justify-center'>
        <LinkButton variant='link' href={backButtonHref}>
          {backButtonLabel}
        </LinkButton>
      </CardFooter>
    </Card>
  )
}
