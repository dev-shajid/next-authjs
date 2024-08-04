'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from 'react'
import CardWrapper from './CardWrapper'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FormToast from '@/components/FormToast'
import { VscLoading } from 'react-icons/vsc'
import { RegisterSchema } from '@/schema/register.schema'
import { reginsterUser } from '@/actions/auth.controler'
import { ApiErrorType } from '@/lib/ApiError'
import { ApiResponseType } from '@/lib/ApiResponse'

export default function RegisterForm() {
  const [isPending, setTransition] = useTransition()
  const [data, setData] = useState<ApiErrorType | ApiResponseType | undefined>(undefined)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: 'Shajid',
      email: 'shajid@gmail.com',
      password: '123456'
    }
  })

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setTransition(async () => {
      let response = await reginsterUser(values)
      setData(response)
      console.log(response)
    })
  }

  return (
    <CardWrapper
      headerLabel='Create an account'
      backButtonLabel="Already registered user?"
      backButtonHref='/auth/login'
      showSocial={true}
      isPending={isPending}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
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
                      disabled={isPending}
                      placeholder='john.doe@example.com'
                      type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder='******'
                      type='password'
                    />
                  </FormControl>
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

          <Button disabled={isPending} type='submit' className='w-full'>
            {isPending ? <VscLoading className='animate-spin size-4' /> : "Submit"}
          </Button>

        </form>
      </Form>
    </CardWrapper>
  )
}
