import React from 'react'

export default function AuthHeader({
    label,
}:{
    label?: string
}) {
    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <h1 className="drop-shadow-md">🔐 Auth</h1>
            <p className="text-muted-foreground">{label}</p>
        </div>
    )
}
