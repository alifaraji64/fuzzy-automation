import React from 'react'

type Props = { children: React.ReactNode }

export default function Layout({ children }: Props) {
    return (
        <div className='flex overflo-hidden
         h-screen border-l-[1px]
          border-t-[1px] pb-20 rounded-l-3xl
          border-muted-foreground/20 overflow-scroll'>
            {children}
        </div>
    )
}