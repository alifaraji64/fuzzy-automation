import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
type Props = {
    name: string,
    description: string,
    id: string,
    publish: boolean | null
}

function Workflow({ name, description, id, publish }: Props) {
    return (
        <Card className='flex w-full items-center justify-between'>
            <CardHeader className='flex flex-col gap-4'>
                <Link href={'/workflow/editor/' + id } className='flex flex-col gap-2'>
                    <div className='flex gap-1'>
                        <Image
                            src={'/assets/googleDrive.png'}
                            alt='drive'
                            width={30}
                            height={30}
                            className='object-contain'
                        />
                        <Image
                            src={'/assets/notion.png'}
                            alt='drive'
                            width={30}
                            height={30}
                            className='object-contain'
                        />
                        <Image
                            src={'/assets/discord.png'}
                            alt='drive'
                            width={30}
                            height={30}
                            className='object-contain'
                        />
                    </div>
                    <CardTitle className='text-xl'>{name}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </Link>
            </CardHeader>
            <div className='flex flex-col items-center gap-2 p-4'>
                <Label>On</Label>
                <Switch></Switch>
            </div>
        </Card>
    )
}

export default Workflow