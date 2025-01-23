'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Background, Connection, Controls, Edge, EdgeChange, MiniMap, Node, NodeChange, ReactFlow, ReactFlowInstance, addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';

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
import { usePathname } from 'next/navigation';
import { v4 } from 'uuid'
import { EditorCanvasDefaultCardTypes } from '@/lib/constants';
import SVGLoader from '@/components/global/svg-loader';
import FlowInstance from './flow-instance';
import EditorCanvasSidebar from './editor-canvas-sidebar';
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
    type CustomEdge = Edge & { target: string, source: string, id: string }
    const { dispatch, state } = useEditor()
    const [nodes, setNodes] = useState<EditorNodeType[]>([])
    const [edges, setEdges] = useState<CustomEdge[]>([])
    const [isWorkFlowLoading, setIsWorkFlowLoading] = useState<boolean>(false)
    const [reactFlowInstance, setReactFlowInstance] =
        useState<ReactFlowInstance<EditorNodeType, CustomEdge>>()
    const pathname = usePathname()
    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault()
            console.log('dropped');

            const type: EditorCanvasCardType['type'] = event.dataTransfer.getData(
                'application/reactflow'
            )
            console.log(nodes);


            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return
            }

            const triggerAlreadyExists = state.editor.elements.find(
                (node) => node.type === 'Trigger'
            )

            if (type === 'Trigger' && triggerAlreadyExists) {
                toast({ title: 'Only one trigger can be added to automations at the moment' })
                return
            }


            if (!reactFlowInstance) return
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            })

            const newNode = {
                id: v4(),
                type,
                position,
                data: {
                    title: type,
                    description: EditorCanvasDefaultCardTypes[type].description,
                    completed: false,
                    current: false,
                    metadata: {},
                    type: type,
                },
            }
            //@ts-ignore
            console.log("Before update:", nodes);
            setNodes((nds) => {
                const updatedNodes = nds.concat(newNode);
                console.log("After update:", updatedNodes);
                return updatedNodes;
            });
        },
        [reactFlowInstance, state]
    )
    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }, [])
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            //@ts-ignore
            setNodes((nds) => applyNodeChanges(changes, nds))
        },
        [setNodes]
    )
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) =>
            //@ts-ignore
            setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    )
    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        []
    )
    const handleClickCanvas = () => {
        dispatch({
            type: 'SELECTED_ELEMENT',
            payload: {
                element: {
                    data: {
                        title: '',
                        description: '',
                        completed: false,
                        current: false,
                        metadata: undefined,
                        type: 'Trigger'
                    },
                    id: '',
                    type: 'Trigger',
                    position: {
                        x: 0,
                        y: 0
                    }
                }
            }
        })
    }
    useEffect(() => {
      dispatch({type:'LOAD_DATA',payload:{
          edges,
          elements: nodes
      }})
    }, [nodes,edges])


    return (
        <ResizablePanelGroup direction={'horizontal'} className='w-2/3'>
            <ResizablePanel defaultSize={70}>
                <div className='flex h-full items-center justify-center'>
                    <div style={{ width: '100%', height: '100vh', paddingBottom: '70px' }}
                        className="relative">
                        {isWorkFlowLoading ?
                            <SVGLoader /> : (<ReactFlow
                                className="w-[300px]"
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                nodes={state.editor.elements}
                                onNodesChange={onNodesChange}
                                edges={edges}
                                onEdgesChange={onEdgesChange}
                                onConnect={onConnect}
                                onInit={setReactFlowInstance}
                                fitView
                                onClick={handleClickCanvas}
                                nodeTypes={nodeTypes}
                            >
                                <Controls position="top-left" />
                                <MiniMap
                                    position="bottom-left"
                                    className="!bg-background"
                                    zoomable
                                    pannable
                                />
                                <Background
                                    //@ts-ignore
                                    variant="dots"
                                    gap={12}
                                    size={1}
                                />
                            </ReactFlow>
                            )
                        }


                    </div>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={40} className='relative sm:block'>
                {isWorkFlowLoading ? <SVGLoader /> : <FlowInstance edges={edges} nodes={nodes} >
                    <EditorCanvasSidebar nodes={nodes} />
                </FlowInstance>}
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default EditorCanvas