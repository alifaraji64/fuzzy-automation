import InfoBar from '@/components/global/infobar'
import MenuOptions from '@/components/sidebar'
import React from 'react'

type Props = { children: React.ReactNode }

export default function Layout({ children }: Props) {
    return (
        <div className='flex overflo-hidden h-screen'>
            <MenuOptions></MenuOptions>
            <div className='w-full p-1'>
                <InfoBar />
                {children}
            </div>
        </div>
    )
}