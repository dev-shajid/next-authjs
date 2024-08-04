import { auth } from '@/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserInfo, UserInfoFallback } from '@/components/UserDetails'
import { getCurrentUser } from '@/lib/authUser.server'
import React, { Suspense } from 'react'

export default async function ServerUserPage() {

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-center'>💻 Server Component</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<UserInfoFallback/>}>
          <ServerUser />
        </Suspense>
      </CardContent>
    </Card>
  )
}

async function ServerUser(){
  await new Promise(resolve => setTimeout(resolve, 1500))
  const user = await getCurrentUser()

  return <UserInfo user={user} /> 

}