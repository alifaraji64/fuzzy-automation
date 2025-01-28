import { ConnectionProviderProps } from '@/providers/connections-provider'
import React, { useCallback } from 'react'
import { Option } from './content-based-on-title'
import { Button } from '@/components/ui/button'
import { postContentToWebHook } from '@/app/(main)/(pages)/connections/_actions/discord-connection'
type Props = {
    currentService: String,
    nodeConnection: ConnectionProviderProps,
    channels: Option[],
    setChannels: (value: Option[]) => void
}

function ActionButton({
    currentService, nodeConnection, channels, setChannels
}: Props) {
    const onSendDiscordMsg = useCallback(async () => {
        const response = await postContentToWebHook(
            nodeConnection.discordNode.content,
            nodeConnection.discordNode.webhookURL)
            if(response.message=='success'){
                nodeConnection.setDiscordNode((prev:any)=>({
                    ...prev,
                    content:''
                }))
            }
    }, [nodeConnection.discordNode])
    switch (currentService) {
        case 'Discord':
            return (
                <>
                    <Button variant={'outline'} onClick={onSendDiscordMsg}>
                        Test Message
                    </Button>
                    {/* <Button variant={'outline'} onClick={onCreateNodeTemplate}>
                        Save Template
                    </Button> */}

                </>)
        case 'Discord':

            break;
        case 'Slack':

            break;
        default:
            break;
    }
}

export default ActionButton