'use client'

import { profile } from '@/actions/profile.controler'
import FormToast from '@/components/FormToast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ApiErrorType } from '@/lib/ApiError'
import { ApiResponseType } from '@/lib/ApiResponse'
import { getCurrentUser } from '@/lib/authUser.client'
import { ProfileSchema } from '@/schema/profile.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRole } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { VscLoading } from 'react-icons/vsc'
import { z } from 'zod'

export default function ProfilePage() {
  const { user, status } = getCurrentUser()
  const { update } = useSession()
  const router = useRouter()

  const [isPending, setTransition] = useTransition()
  const [data, setData] = useState<ApiErrorType | ApiResponseType | undefined>(undefined)
  const [newData, setNewData] = useState<{ [key: string]: string | UserRole }>({})

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
    },
  })

  const handleNewData = (values: z.infer<typeof ProfileSchema>) => {
    // TODO: Complex Type Defining
    Object.keys(values).forEach((key) => {
      if ((user as { [key: string]: any })[key] != (values as { [key: string]: string | UserRole })[key]) {
        setNewData(_ => ({ ..._, [key]: (values as { [key: string]: any })[key] }))
      }else{
      
        setNewData(pre=>{
          const newItems = {...pre}
          delete newItems[key]
          return newItems
        })
      }
    })
  }

  const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
    if (!user || !Object.values(values).filter(e => e).length) return;
    setTransition(async () => {
      handleNewData(values)
      if (!Object.keys(newData).length) return;
      const res = await profile(newData)
      if (res) setData(res)
      if (Object.keys(newData).length && res.success) {
        await update(newData)
        router.refresh()
      }
    })
  }

  useEffect(() => {
    if (status == 'authenticated') {
      form.reset({
        name: user?.name || undefined,
        email: user?.email || undefined,
        role: user?.role || undefined
      })
    }
  }, [user])

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-center'>⚙️ Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={e => {
                          field.onChange(e)
                          handleNewData({ name: e.target.value })
                        }}
                        disabled={isPending}
                        placeholder='John Doe'
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={e => {
                          field.onChange(e)
                          handleNewData({ email: e.target.value })
                        }}
                        disabled={isPending}
                        placeholder='johndoe@example.com'
                        type='email'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={e => {
                        field.onChange(e)
                        handleNewData({ role: e as UserRole })
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>{UserRole.ADMIN}</SelectItem>
                        <SelectItem value={UserRole.USER}>{UserRole.USER}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {
              data && <FormToast
                success={data?.success ?? true}
                message={data?.message}
              />
            }

            <Button disabled={isPending || !Object.values(newData).length} type='submit' className='w-full'>
              {isPending ? <VscLoading className='animate-spin size-4' /> : "Update Name"}
            </Button>

          </form>
        </Form>
      </CardContent>
    </Card>
  )
}