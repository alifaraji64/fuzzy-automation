'use client'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import Image from 'next/image'
import Link from 'next/link'
import { onFlowPublish } from '../_actions/workflow-connections'
import { MouseEventHandler } from 'react'
import { useToast } from '@/hooks/use-toast'
type Props = {
    name: string,
    description: string,
    id: string,
    publish: boolean | null
}

function Workflow({ name, description, id, publish }: Props) {
    const { toast } = useToast()
    const onPublishFlow = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const response = await onFlowPublish(
            id,
            event.currentTarget.ariaChecked == 'true',)
        toast({ title: response })

    }
    return (
        <Card className='flex w-full items-center justify-between'>
            <CardHeader className='flex flex-col gap-4'>
                <Link href={'/workflows/editor/' + id} className='flex flex-col gap-2'>
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
                <Label
                    htmlFor='airplane-mode'
                    className='text-muted-foreground'
                >
                    {publish ? 'On' : 'Off'}
                </Label>
                <Switch
                    id='airplane-mode'
                    defaultChecked={publish!}
                    onClick={onPublishFlow}
                />
            </div>
        </Card>
    )
}

export default Workflow