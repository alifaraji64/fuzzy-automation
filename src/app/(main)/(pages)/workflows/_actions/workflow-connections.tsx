'use server'

import { db } from "@/lib/db"

export const onCreateNodesEdges = async (
    flowId: string,
    nodes: string,
    edges: string,
    flowPath: string
) => {
    try {
        const flow = await db.workflows.update({
            where: {
                id: flowId
            },
            data: {
                nodes, edges, flowPath
            }
        })
        if (flow) return { message: 'flow saved' }
    } catch (error) {
        console.log('error creating nodes and edges');
        console.log(error);
    }
}

export const onFlowPublish = async (workflowId: string, state: boolean) => {
    console.log(state);
    try {
        const published = await db.workflows.update({
            where: {
                id: workflowId
            },
            data: {
                publish: state
            }
        })
        if (published.publish) return 'workflow published'
        return 'workflow not published'
    } catch (error) {
        console.log('error publishing the workflow');
        console.log(error);
    }

}