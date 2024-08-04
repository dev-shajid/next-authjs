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
import { ApiResponseType } from '@/lib/ApiResponse'
import { ApiErrorType } from '@/lib/ApiError'
import { newPassword } from '@/actions/resetPassword.controler'
import { NewPasswordSchema } from '@/schema/newPassword.schema'
import { redirect, RedirectType } from 'next/navigation'


export default function NewPasswordForm({ token }: { token: string }) {
  const [isPending, setTransition] = useTransition()
  const [data, setData] = useState<ApiErrorType | ApiResponseType | undefined>(undefined)

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    }
  })

  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    setTransition(async () => {
      const res = await newPassword(values, token)
      if (res) setData(res);
      if (res.success) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        redirect('/auth/login', RedirectType.push)
      }
    })
  }

  return (
    <CardWrapper
      headerLabel='Enter a new password'
      backButtonLabel="Back to Login"
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
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
            {isPending ? <VscLoading className='animate-spin size-4' /> : "Reset Password"}
          </Button>

        </form>
      </Form>
    </CardWrapper>
  )
}
