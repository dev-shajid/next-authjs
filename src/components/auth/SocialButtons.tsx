'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

export default function SocialButtons({
    isPending=false
}) {
  return (
    <div className='flex items-center w-full gap-x-2'>
        <Button
          size='lg'
          className='w-full'
          variant='outline'
          onClick={() => {}}
          disabled={isPending}
        >
          <FcGoogle className='size-5'/>
        </Button>
        <Button
          size='lg'
          className='w-full'
          variant='outline'
          onClick={() => {}}
          disabled={isPending}
        >
          <FaGithub className='size-5'/>
        </Button>
    </div>
  )
}
