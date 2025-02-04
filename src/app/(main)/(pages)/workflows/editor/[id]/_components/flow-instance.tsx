import { Button } from '@/components/ui/button'
import { useNodeConnections } from '@/providers/connections-provider'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { onCreateNodesEdges, onFlowPublish } from '../../../_actions/workflow-connections'
import { useToast } from "@/hooks/use-toast"
import { CustomEdge } from './editor-canvas'
import { EditorCanvasTypes, EditorNodeType } from '@/lib/types'
type Props = {
    children: React.ReactNode
    edges: CustomEdge[],
    nodes: EditorNodeType[]
}

function FlowInstance({ children, edges, nodes }: Props) {
    const { toast } = useToast()
    const pathName = usePathname();
    const [isFlow, setisFlow] = useState<EditorCanvasTypes[]>([])
    const { nodeConnection } = useNodeConnections()
    const onFlowAutomation = useCallback(async () => {
        console.log(nodes);
        console.log(edges);

        const flow = await onCreateNodesEdges(
            pathName.split('/').pop()!,
            JSON.stringify(nodes),
            JSON.stringify(edges),
            JSON.stringify(isFlow)
        )
    }, [nodes, edges])
    const onPublishWorkflow = useCallback(
        async () => {
            const response = await onFlowPublish(
                pathName.split('/').pop()!,
                true)
            if (response) toast({ title: response })
        },
        [],
    )
    const onAutomateFlow = async () => {
        const flows: EditorCanvasTypes[] = [];
        const connectedEdges = edges.map(edge => edge.target)
        connectedEdges.forEach(target => {
            nodes.forEach(node => {
                if (node.id === target) {
                    flows.push(node.type)
                }
            })
        })
        console.log(flows);
        
        setisFlow(flows)
    }

    useEffect(() => {
        onAutomateFlow()
    }, [edges])


    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-3 p-4'>
                <Button
                    onClick={onFlowAutomation}
                    disabled={isFlow.length < 1}>
                    Save
                </Button>
                <Button
                    onClick={onPublishWorkflow}
                    disabled={isFlow.length < 1}>
                    Publish
                </Button>
            </div>
            {children}
        </div>
    )
}

export default FlowInstance