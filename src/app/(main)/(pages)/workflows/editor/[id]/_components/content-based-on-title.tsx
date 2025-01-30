import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { onContentChange } from '@/lib/editor-utils'
import { nodeMapper } from '@/lib/utils'
import { ConnectionProviderProps } from '@/providers/connections-provider'
import { EditorState } from '@/providers/editor-provider'
import { AccordionContent } from '@radix-ui/react-accordion'
import React from 'react'
import GoogleFileDetails from './google-file-details'
import GoogleDriveFile from './google-drive-files'
import ActionButton from './action-button'
export type Option = {
    value: string,
    label: string,
    disable?: boolean,
    fixed?: boolean,
}
type Props = {
    nodeConnection: ConnectionProviderProps,
    newState: EditorState,
    file: any,
    setFile: (file: any) => void,
    selectedSlackChannels: Option[]
    setSelectedSlackChannels: (value: Option[]) => void

}

function ContentBasedOnTitle({
    nodeConnection,
    newState,
    file,
    setFile,
    selectedSlackChannels,
    setSelectedSlackChannels
}: Props) {
    const { selectedNode } = newState.editor
    const { title } = selectedNode.data
    const nodeConnectionType: any =
        nodeConnection[nodeMapper[title] as keyof ConnectionProviderProps]
        
    if (!nodeConnectionType) return <p>Not Connected</p>
    const isConnected =
        title == 'Google Drive' ? !nodeConnection.isLoading
            : !!nodeConnectionType[
            `${title == 'Slack' ? 'slackAccessToken' :
                title == 'Discord' ? 'webhookURL' :
                    title == 'Notion' ? 'accessToken' : ''
            }`
            ]

    return (
        <AccordionContent>
            <Card>
                {title == 'Discord' && (
                    <CardHeader>
                        <p>Discord</p>
                        <CardDescription>{nodeConnectionType.guildName}</CardDescription>
                    </CardHeader>
                )}
                <div className='flex flex-col gap-3 py-3 pb-20'>
                    <p>{title === 'Notion' ? 'values to be stored' : 'message'}</p>
                    {title == 'Discord' || title == 'Slack' ? (
                        <Input
                            type='text'
                            value={nodeConnectionType.content}
                            onChange={(event) => {
                                
                                onContentChange(nodeConnection, title, event)
                            }}
                        />
                    ) : null}
                    {title !== 'Google Drive' ? (
                        <Card className='w-full'>
                            <CardContent className='px-2 py-3'>
                                <div className='flex flex-col gap-4'>
                                    <CardDescription>Drive File</CardDescription>
                                    <div className='flex flex-wrap gap-2'>
                                        <GoogleFileDetails
                                            nodeConnection={nodeConnection}
                                            title={title}
                                            gFile={file}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ):(
                        <GoogleDriveFile
                        nodeConnection={nodeConnection}
                        googleFile={file}
                        setGoogleFile={setFile}
                        />
                    )
                }
                <ActionButton
                currentService={title}
                nodeConnection={nodeConnection}
                channels={selectedSlackChannels}
                setChannels={setSelectedSlackChannels}
                />

                </div>
            </Card>
        </AccordionContent>
    )
}

export default ContentBasedOnTitle