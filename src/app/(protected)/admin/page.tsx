'use client'


import { admin } from '@/actions/admin'
import FormToast from '@/components/FormToast'
import RoleGate from '@/components/RoleGate'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SessionProvider } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function ProfilePage() {

  const handleApiRoute = async () => {
    const toastId = toast.loading('Loading...')
    const res = await fetch('/api/admin')
    const data = await res.json()
    if (res.ok) {
      toast.success(data.message, { id: toastId })
    }
    else {
      toast.error(data.message, { id: toastId })
    }
  }

  const handleServerAction = async () => {
    const toastId = toast.loading('Loading...')
    const res = await admin()
    if (res.ok) {
      toast.success(res.message, { id: toastId })
    }
    else {
      toast.error(res.message, { id: toastId })
    }
  }

  return (
    <SessionProvider>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-center'>🔑 Admin</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>

          <RoleGate allowedRole='ADMIN'>
            <FormToast message='You are allowed to view this page' success={true} />
          </RoleGate>

          <div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-md">
            <p className="text-sm font-medium">Admin-only API Route</p>
            <Button onClick={handleApiRoute} size='sm'>Click to Test</Button>
          </div>

          <div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-md">
            <p className="text-sm font-medium">Admin-only Server Action</p>
            <Button onClick={handleServerAction} size='sm'>Click to Test</Button>
          </div>

        </CardContent>
      </Card>
    </SessionProvider>
  )
}