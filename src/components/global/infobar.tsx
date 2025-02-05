'use client'
import { Book, Headphones, Search } from 'lucide-react'
import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { UserButton } from '@clerk/nextjs'
import { getTierAndCredits } from '@/app/(main)/(pages)/billing/_actions/get-payment-details'
import { useBilling } from '@/providers/billing-provider'
import { useToast } from '@/hooks/use-toast'

type Props = {}

function InfoBar({ }: Props) {
    const { toast } = useToast()
    const { credits, tier, setTier, setCredits } = useBilling()
    const getBillingdetails = async () => {
        const tierAndCredits = await getTierAndCredits()
        setTier(tierAndCredits?.tier || tier)
        setCredits(tierAndCredits?.credits || credits)
        
        if(tierAndCredits?.credits=='0'){
            toast({ title: "you don't have enough credits, upgrade your plan" })
        }
    }

    useEffect(() => {
        getBillingdetails()
    }, [])

    return (
        <div className='flex flex-row justify-end gap-6
        items-center px-4 w-full
         dark:bg-black'>
            <div className='flex'>
                <p className='border-2 p-1'>credits:{' ' + credits}</p>

                <p className='border-2 p-1 ml-2'>tier:{' ' + tier}</p>
            </div>
            <span className='flex items-center bg-muted
             rounded-full px-4'>
                <Search />
                <Input placeholder='Quick Search'
                    className='border-none bg-transparent' />
            </span>
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <Headphones />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Contact Support</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <Book />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Guide</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <UserButton />
        </div >
    )
}

export default InfoBar