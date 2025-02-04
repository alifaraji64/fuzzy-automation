import { ConnectionProviderProps } from '@/providers/connections-provider'
import React, { useCallback } from 'react'
import { Option } from './content-based-on-title'
import { Button } from '@/components/ui/button'
import { postContentToWebHook } from '@/app/(main)/(pages)/connections/_actions/discord-connection'
import { onCreateNodeTemplate } from '../../../_actions/workflow-connections'
import { usePathname } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { onCreateNewPageInDatabase } from '@/app/(main)/(pages)/connections/_actions/notion-connection'
import { postMessageToSlack } from '@/app/(main)/(pages)/connections/_actions/slack-connection'
type Props = {
    currentService: string,
    nodeConnection: ConnectionProviderProps,
    channels: Option[],
    setChannels: (value: Option[]) => void
}

function ActionButton({
    currentService, nodeConnection, channels, setChannels
}: Props) {
    const pathname = usePathname()
    const { toast } = useToast()
    const onSendDiscordMsg = useCallback(async () => {
        const response = await postContentToWebHook(
            nodeConnection.discordNode.content,
            nodeConnection.discordNode.webhookURL)
        if (response.message == 'success') {
            nodeConnection.setDiscordNode((prev: any) => ({
                ...prev,
                content: ''
            }))
        }
    }, [nodeConnection.discordNode])
    const onCreateLocalNodeTemplate = useCallback(async () => {
        if (currentService == 'Discord') {
            const response = await onCreateNodeTemplate(
                nodeConnection.discordNode.content,
                currentService,
                pathname.split('/').pop()!,
                channels,
            )
            if (response) {
                toast({ title: response })
            }
        }
        if (currentService == 'Slack') {
            const response = await onCreateNodeTemplate(
                nodeConnection.slackNodeRef.current.content,
                currentService,
                pathname.split('/').pop()!,
                channels,
                nodeConnection.slackNode.slackAccessToken
            )
            if (response) {
                toast({ title: response })
            }
        }
        if (currentService == 'Notion') {
            const response = await onCreateNodeTemplate(
                nodeConnection.notionNode.content,
                currentService,
                pathname.split('/').pop()!,
                [],
                nodeConnection.notionNode.accessToken,
                nodeConnection.notionNode.databaseId
            )
            if (response) {
                toast({ title: response })
            }
        }
    }, [nodeConnection, channels])

    const onSendNotionContent = useCallback(async () => {
        const response = await onCreateNewPageInDatabase(
            nodeConnection.notionNode.databaseId,
            nodeConnection.notionNode.accessToken,
            nodeConnection.notionNode.content
        )
        if (response) {

            toast({ title: 'Message sent successfully', style: { backgroundColor: 'green', color: 'white' } })
            nodeConnection.setNotionNode((prev: any) => ({
                ...prev,
                content: ''

            }))
        }
    }, [nodeConnection])
    const onStoreSlackContent = useCallback(async () => {
        const response = await postMessageToSlack(
            nodeConnection.slackNode.slackAccessToken,
            channels!,
            nodeConnection.slackNodeRef.current.content
        )
        if (response.message == 'Success') {
            toast({ title: 'Message sent successfully', style: { backgroundColor: 'green', color: 'white' } })
            nodeConnection.setSlackNode((prev: any) => ({
                ...prev,
                content: '',
            }))
            setChannels!([])
        } else {
            toast({ title: response.message, variant: 'destructive' })
        }
    }, [])
    switch (currentService) {
        case 'Discord':
            return (
                <>
                    <Button variant={'outline'} onClick={onSendDiscordMsg}>
                        Test Message
                    </Button>
                    <Button variant={'outline'} onClick={onCreateLocalNodeTemplate}>
                        Save Template
                    </Button>

                </>)
        case 'Notion':
            return (
                <>
                    <Button variant={'outline'} onClick={onSendNotionContent}>
                        Test Message
                    </Button>
                    <Button variant={'outline'} onClick={onCreateLocalNodeTemplate}>
                        Save Template
                    </Button>

                </>)
        case 'Slack':

            return (
                <>
                    <Button variant={'outline'} onClick={onStoreSlackContent}>
                        Test Message
                    </Button>
                    <Button variant={'outline'} onClick={onCreateLocalNodeTemplate}>
                        Save Template
                    </Button>

                </>)
        default:
            return null;
    }
}

export default ActionButton