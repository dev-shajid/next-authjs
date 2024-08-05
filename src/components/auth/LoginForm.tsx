'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState, useTransition } from 'react'
import CardWrapper from './CardWrapper'
import { z } from 'zod'
import { LoginSchema } from '@/schema/login.schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FormToast from '@/components/FormToast'
import { VscLoading } from 'react-icons/vsc'
import { loginUser } from "@/actions/auth.controler"
import ApiResponse, { ApiResponseType } from '@/lib/ApiResponse'
import ApiError, { ApiErrorType } from '@/lib/ApiError'
import { LinkButton } from '../ui/linkButton'


interface FormLoginProps {
  isVerified: boolean;
  OAuthAccountNotLinked: boolean;
  callback?:string | null;
}
export default function LoginForm({ isVerified, OAuthAccountNotLinked, callback }: FormLoginProps) {
  const [isPending, setTransition] = useTransition()
  const [data, setData] = useState<ApiErrorType | ApiResponseType | undefined>(undefined)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setTransition(async () => {
      const res = await loginUser(values, callback)
      if (res) setData(res)
      console.log(res)
    })
  }

  useEffect(() => {
    if (isVerified) {
      setData(ApiResponse(200, "Email verified, please login"))
    }
    if (OAuthAccountNotLinked) {
      setData(ApiError(400, "This account is linked with OAuth, please login with OAuth"))
    }
  }, [isVerified, OAuthAccountNotLinked])

  return (
    <CardWrapper
      headerLabel='Welcome Back'
      backButtonLabel="Don't have an account?"
      backButtonHref='/auth/register'
      showSocial={true}
      isPending={isPending}
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
            <LinkButton href='/auth/reset' variant='link' size='sm' className='!p-0'>Forgot your password?</LinkButton>

          {
            data && <FormToast
              success={data?.success ?? true}
              message={data?.message}
            />
          }

          <Button disabled={isPending} type='submit' className='w-full'>
            {isPending ? <VscLoading className='animate-spin size-4' /> : "Login"}
          </Button>

        </form>
      </Form>
    </CardWrapper>
  )
}
