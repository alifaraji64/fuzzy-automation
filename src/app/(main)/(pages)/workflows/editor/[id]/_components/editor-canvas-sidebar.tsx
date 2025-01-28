import { EditorCanvasTypes, EditorNodeType } from '@/lib/types'
import { useEditor } from '@/providers/editor-provider'
import React, { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNodeConnections } from '@/providers/connections-provider'
import { Separator } from '@/components/ui/separator'
import { CONNECTIONS, EditorCanvasDefaultCardTypes } from '@/lib/constants'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchBotSlackChannels, onConnections, onDragStart } from '@/lib/editor-utils'
import EditorCanvasIconHelper from './editor-canvas-icon-helper'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import RenderConnectionAccordion from './render-connection-accordion'
import RenderOutputAccordion from './render-output-accordion'
import { useFuzzieStore } from '@/store'


type Props = {
    nodes: EditorNodeType[]
}

function EditorCanvasSidebar({ nodes }: Props) {
    const { state } = useEditor()
    const { nodeConnection } = useNodeConnections()
    const { googleFile, setSlackChannels } = useFuzzieStore()
    useEffect(() => {
        if (state) {
            onConnections(nodeConnection, state, googleFile)
        }
    }, [state])
    useEffect(() => {
        if (nodeConnection.slackNode.slackAccessToken) {
            fetchBotSlackChannels(
                nodeConnection.slackNode.slackAccessToken,
                setSlackChannels)
        }
    }, [nodeConnection])
    return (
        <aside>
            <Tabs defaultValue='actions' className='h-screen overflow-scroll pb-24'>
                <TabsList>
                    <TabsTrigger value='actions'>Actions</TabsTrigger>
                    <TabsTrigger value='settings'>Settings</TabsTrigger>
                </TabsList>
                <Separator />
                <TabsContent value='actions' className='flex flex-col gap-4 p-4'>
                    {Object.entries(EditorCanvasDefaultCardTypes).filter(([key, value]) => {

                        return (!nodes.length && value['type'] == 'Trigger') ||
                            (nodes.length && value['type'] == 'Action')
                    }).map(([key, value]) => (
                        <Card
                            key={key}
                            draggable
                            className='w-full text-sm cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900'
                            onDragStart={(event: React.DragEvent) => {
                                console.log(event);
                                onDragStart(event, key as EditorCanvasTypes)

                            }}
                        >
                            <CardHeader className='flex flex-row items-center gap-4 p-4'>
                                <EditorCanvasIconHelper type={key as EditorCanvasTypes} />
                                <CardTitle>
                                    {key}
                                    <CardDescription>
                                        {value['description']}
                                    </CardDescription>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    ))
                    }
                </TabsContent>
                <TabsContent value='settings' className='flex flex-col gap-4 p-4'>
                    {state.editor.selectedNode.data.title}
                    <Accordion type="multiple">
                        <AccordionItem value="Options">
                            <AccordionTrigger>
                                Account
                            </AccordionTrigger>
                            <AccordionContent>
                                {CONNECTIONS.map(connection => (
                                    <RenderConnectionAccordion
                                        key={connection.title}
                                        connection={connection}
                                        state={state}
                                    />
                                ))}

                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="Expected Output">
                            <AccordionTrigger>
                                Action
                            </AccordionTrigger>
                            <RenderOutputAccordion
                                state={state}
                                nodeConnection={nodeConnection}
                            />
                        </AccordionItem>
                    </Accordion>

                </TabsContent>
            </Tabs>
        </aside>
    )
}

export default EditorCanvasSidebar