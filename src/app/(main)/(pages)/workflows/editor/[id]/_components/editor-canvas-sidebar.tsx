import { EditorNodeType } from '@/lib/types'
import { useEditor } from '@/providers/editor-provider'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNodeConnections } from '@/providers/connections-provider'
import { Separator } from '@/components/ui/separator'
import { EditorCanvasDefaultCardTypes } from '@/lib/constants'
import { Card } from '@/components/ui/card'


type Props = {
    nodes: EditorNodeType[]
}

function EditorCanvas({ nodes }: Props) {
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
                         draggable
                          className='w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900'
                          onDragStart={(event)=>{
                            console.log(event);
                            
                          }}
                          >
                            {key}
                        </Card>
                    ))
                    }
                </TabsContent>
            </Tabs>
        </aside>
    )
}

export default EditorCanvas