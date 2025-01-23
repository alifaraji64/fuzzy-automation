import { Button } from '@/components/ui/button'
import { useNodeConnections } from '@/providers/connections-provider'
import { usePathname } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { onCreateNodesEdges, onFlowPublish } from '../../../_actions/workflow-connections'
import { useToast } from "@/hooks/use-toast"
type Props = {
    children: React.ReactNode
    edges: any[],
    nodes: any[]
}

function FlowInstance({ children, edges, nodes }: Props) {
    const { toast } = useToast()
    const pathName = usePathname();
    const [isFlow, setisFlow] = useState([])
    const { nodeConnection } = useNodeConnections()
    const onFlowAutomation = useCallback(async () => {
        const flow = await onCreateNodesEdges(
            pathName.split('/').pop()!,
            JSON.stringify(nodes),
            JSON.stringify(edges),
            JSON.stringify(isFlow)
        )
    }, [])
    const onPublishWorkflow = useCallback(
        async () => {
            const response = await onFlowPublish(
                pathName.split('/').pop()!,
                true)
            if (response) toast({ title: response })
        },
        [],
    )

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