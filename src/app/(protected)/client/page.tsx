'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserInfo, UserInfoFallback } from '@/components/UserDetails'
import { getCurrentUser } from '@/lib/authUser.client'
import { SessionProvider } from 'next-auth/react'

export default function ClientUserPage() {

  return (
    <SessionProvider>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-center'>📱 Client Component</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientUser />
        </CardContent>
      </Card>
    </SessionProvider>
  )
}

function ClientUser() {
  const {user, status} = getCurrentUser()

  if(status=='loading') return <UserInfoFallback />

  return <UserInfo user={user} />

}