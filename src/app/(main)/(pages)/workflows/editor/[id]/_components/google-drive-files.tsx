import { ConnectionProviderProps } from '@/providers/connections-provider'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { getGoogleListener } from '../../../_actions/workflow-connections'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SVGLoader from '@/components/global/svg-loader'
type Props = {
    nodeConnection: ConnectionProviderProps,
    googleFile: any,
    setGoogleFile: (googleFile: any) => void
}

function GoogleDriveFile({ nodeConnection, googleFile, setGoogleFile }: Props) {
    const { toast } = useToast();
    const [loading, setloading] = useState(false)
    const [isListening, setisListening] = useState(false)
    const reqGoogle = async () => {
        setloading(true);
        const response = await axios.get('/api/drive-activity')


        if (response) {
            toast({ title: response.data })
            setloading(false)
            setisListening(true)
        }
    }
    const onListener = async () => {
        const listener = await getGoogleListener();
        console.log('erer');

        if (listener?.googleResourceId !== null) {
            console.log('listening');

            setisListening(true)
        }

    }
    useEffect(() => {
        onListener()
    }, [])

    return (
        <div className='flex flex-col gap-3 pb-6'>
            {isListening ? (
                <Card className='py-3'>
                    <CardContent>
                        <CardDescription>Listening...</CardDescription>
                    </CardContent>
                </Card>
            ) : (
                <Button
                    variant={'outline'}
                    onClick={async () => {
                        if (loading) return;
                        await reqGoogle()
                    }}
                >
                    {loading ? <SVGLoader /> : 'Create Listener'}
                </Button>
            )}
        </div>
    )
}

export default GoogleDriveFile