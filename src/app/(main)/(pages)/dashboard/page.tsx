import React from 'react'

type Props = {}

export default function DashboardPage({ }: Props) {
    return (
        <div className='flex flex-col gap-4 relative'>
            <h1 className='text-4xl sticky top-0 z-[10]
         p-6 bg-background/70 backdrop-blur-lg
          items-center border-b flex'>
            Dashboard
          </h1>
        </div>
    )
}