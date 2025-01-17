'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { div } from 'framer-motion/client'
import { menuOptions } from '@/lib/constants'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Database, GitBranch } from 'lucide-react'
import { ModeToggle } from '../global/mode-toggle'

type Props = {}

const MenuOptions = (props: Props) => {
    const pathName = usePathname()
    return (
        <nav className='dark:bg-black overflow-scroll
        justify-between flex items-center flex-col gap-10 py-6 px-2'>
            <div className='flex items-center justify-center flex-col gap-5'>
                <Link href={'/'} className='flex fonty-bold flex-row'>
                    fuzzie.
                </Link>
                <TooltipProvider delayDuration={0}>
                    {menuOptions.map((item) => (
                        <ul key={item.name}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <li>
                                        <Link href={item.href}
                                            className='group  cursor-pointer
                                     dark:bg-[#2F006B]
                                      bg-[#EEE0FF]'>
                                            <item.Component
                                                selected=
                                                {pathName == item.href} />
                                        </Link>
                                    </li>
                                </TooltipTrigger>
                                <TooltipContent side='right'>
                                    {item.name}
                                </TooltipContent>
                            </Tooltip>

                        </ul>
                    ))}
                </TooltipProvider>
                <Separator />
                <div className='flex items-center flex-col gap-3
                 dark:bg-[#353346]/30 py-4 px-2 rounded-full overflow-scroll border-[1px]'>
                    <GitBranch size={18} className='text-muted-foreground' />
                    <Separator orientation='horizontal' />
                    <GitBranch size={18} className='text-muted-foreground' />
                    <Separator orientation='horizontal' />
                    <Database size={18} className='text-muted-foreground' />
                </div>
            </div>
            <div className='flex items-center justify-center
             flex-col gap-8'>
                <ModeToggle />
            </div>
        </nav>
    )
}

export default MenuOptions