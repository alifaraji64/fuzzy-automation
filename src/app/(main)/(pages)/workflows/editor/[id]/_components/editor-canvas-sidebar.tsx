import { EditorCanvasTypes, EditorNodeType } from '@/lib/types'
import { useEditor } from '@/providers/editor-provider'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNodeConnections } from '@/providers/connections-provider'
import { Separator } from '@/components/ui/separator'
import { EditorCanvasDefaultCardTypes } from '@/lib/constants'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { onDragStart } from '@/lib/editor-utils'
import EditorCanvasIconHelper from './editor-canvas-icon-helper'


type Props = {
    nodes: EditorNodeType[]
}

function EditorCanvasSidebar({ nodes }: Props) {
    const { state } = useEditor()
    const { nodeConnection } = useNodeConnections()
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
            </Tabs>
        </aside>
    )
}

export default EditorCanvasSidebar