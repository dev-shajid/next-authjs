'use client'

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar } from '../ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { FaUser } from 'react-icons/fa'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export default function UserButton() {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src=''/>
                <AvatarFallback className='bg-black w-full grid place-content-center'>
                    <FaUser className='text-white'/>
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={()=>signOut()}>
                <LogOut className='size-5 mr-2'/>
                <p>Sign Out</p>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
