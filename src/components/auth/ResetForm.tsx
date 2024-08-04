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
import { ResetSchema } from '@/schema/reset.schema'
import { reset } from '@/actions/resetPassword.controler'


export default function ResetForm() {
  const [isPending, setTransition] = useTransition()
  const [data, setData] = useState<ApiErrorType | ApiResponseType | undefined>(undefined)

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    }
  })

  const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
    setTransition(async () => {
      const res = await reset(values)
      console.log(res)
      if (res) setData(res)
    })
  }

  return (
    <CardWrapper
      headerLabel='Forgot your password?'
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
          </div>

          {
            data && <FormToast
              success={data?.success ?? true}
              message={data?.message}
            />
          }

          <Button disabled={isPending} type='submit' className='w-full'>
            {isPending ? <VscLoading className='animate-spin size-4' /> : "Send reset email"}
          </Button>

        </form>
      </Form>
    </CardWrapper>
  )
}
