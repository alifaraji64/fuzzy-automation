'use client'
import React, { useCallback, useMemo } from 'react'
import { ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { EditorCanvasCardType, EditorCanvasTypes, EditorNodeType } from '@/lib/types';
import { useEditor } from '@/providers/editor-provider';
import EditorCanvasCardSingle from './editor-canvas-card-single';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useToast } from "@/hooks/use-toast"

type Props = {}



function EditorCanvas({ }: Props) {
    const { toast } = useToast()
    const nodeTypes = useMemo(
        () => ({
            Action: EditorCanvasCardSingle,
            Trigger: EditorCanvasCardSingle,
            Email: EditorCanvasCardSingle,
            Condition: EditorCanvasCardSingle,
            AI: EditorCanvasCardSingle,
            Slack: EditorCanvasCardSingle,
            'Google Drive': EditorCanvasCardSingle,
            Notion: EditorCanvasCardSingle,
            Discord: EditorCanvasCardSingle,
            'Custom Webhook': EditorCanvasCardSingle,
            'Google Calendar': EditorCanvasCardSingle,
            Wait: EditorCanvasCardSingle,
        }),
        []
    )
    const { state, dispatch } = useEditor()
    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>)=>{
        event.preventDefault()
        const type:EditorCanvasCardType['type'] = event.dataTransfer
        .getData('application/reactFlow') as EditorCanvasCardType['type']

        if(typeof type == 'undefined'|| !type){
            return;
        }
        const triggerAlreadyExists = state.editor.elements
        .find(node=>node.type=='Trigger')
        if(type == 'Trigger' && triggerAlreadyExists){
            toast({
                title: "Only One Trigger Can be Added to Automation Flow"
              })
            return;
        }
    },[])
    return (
        <ResizablePanelGroup direction={'horizontal'}>
            <ResizablePanel defaultSize={70}>
                <div className='flex h-full items-center justify-center'>
                    <div className='h-full w-full pb-[70px]'>
                        <ReactFlow
                        className='w-[300px]'
                        onDrop={onDrop}
                        ></ReactFlow>
                    </div>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default EditorCanvas