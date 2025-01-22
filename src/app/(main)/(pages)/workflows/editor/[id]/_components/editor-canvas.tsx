import React, { useMemo } from 'react'
import { ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { EditorNodeType } from '@/lib/types';
import { useEditor } from '@/providers/editor-provider';
import EditorCanvasCardSingle from './editor-canvas-card-single';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
type Props = {}

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
function EditorCanvas({ }: Props) {
    const { state, dispatch } = useEditor()
    return (
            <ResizablePanelGroup direction={'horizontal'}>
                <ResizablePanel defaultSize={70}>
                    <div className='flex h-full items-center justify-center'>
                        <div className='h-full w-full pb-[70px]'>
                            <ReactFlow></ReactFlow>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
    )
}

export default EditorCanvas