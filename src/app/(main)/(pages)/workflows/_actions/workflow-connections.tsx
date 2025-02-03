'use server'

import { db } from "@/lib/db"
import { auth, currentUser } from "@clerk/nextjs/server"
import { Option } from "@/store"
import { error } from "node:console"
export const onCreateNodesEdges = async (
    flowId: string,
    nodes: string,
    edges: string,
    flowPath: string
) => {
    console.log(JSON.parse(nodes).length);
    
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
        console.log(error);
        return 'error publishing the workflow'
    }
}

export const getGoogleListener = async () => {
    const { userId } = await auth()
    if (!userId) return;
    const listener = await db.user.findUnique({
        where: {
            clerkId: userId
        },
        select: {
            googleResourceId: true
        }
    })
    if (listener) return listener;
}
export const onCreateNodeTemplate = async (
    content: string,
    type: string,
    workflowId: string,
    channels?: Option[],
    accessToken?: string,
    notionDbId?: string
) => {
    if (type === 'Discord') {
        const response = await db.workflows.update({
            where: {
                id: workflowId,
            },
            data: {
                discordTemplate: content,
            },
        })

        if (response) {
            return 'Discord template saved'
        }
    }
    if (type === 'Slack') {
        const response = await db.workflows.update({
            where: {
                id: workflowId,
            },
            data: {
                slackTemplate: content,
                slackAccessToken: accessToken,
            },
        })

        if (response) {
            const channelList = await db.workflows.findUnique({
                where: {
                    id: workflowId,
                },
                select: {
                    slackChannels: true,
                },
            })

            if (channelList) {
                //remove duplicates before insert
                const NonDuplicated = channelList.slackChannels.filter(
                    (channel) => channel !== channels![0].value
                )

                NonDuplicated!
                    .map((channel) => channel)
                    .forEach(async (channel) => {
                        await db.workflows.update({
                            where: {
                                id: workflowId,
                            },
                            data: {
                                slackChannels: {
                                    push: channel,
                                },
                            },
                        })
                    })

                return 'Slack template saved'
            }
            channels!
                .map((channel) => channel.value)
                .forEach(async (channel) => {
                    await db.workflows.update({
                        where: {
                            id: workflowId,
                        },
                        data: {
                            slackChannels: {
                                push: channel,
                            },
                        },
                    })
                })
            return 'Slack template saved'
        }
    }

    if (type === 'Notion') {
        const response = await db.workflows.update({
            where: {
                id: workflowId,
            },
            data: {
                notionTemplate: content,
                notionAccessToken: accessToken,
                notionDbId: notionDbId,
            },
        })

        if (response) return 'Notion template saved'
    }
}

export const onGetWorkFlows = async () => {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user does not exist');
        const workflows = await db.workflows.findMany({
            where: {
                userId: user.id
            }
        })
        if (!workflows) throw new Error('work flows does not exist');
        return workflows
    } catch (error) {
        console.log(error);

    }
}
export const onCreateWorkflow = async (title: string, description: string) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error('user does not exist');
        const workflow = await db.workflows.create({
            data: {
                description,
                name: title,
                userId: user.id
            }
        })
        if (!workflow) return { message: 'oops try again' }
        return { message: 'workflow created' }
    } catch (error) {
        console.log(error);

    }
}
export const onGetNodesEdges = async (flowId: string) => {
    try {
        const res = await db.workflows.findUnique({
            where: {
                id: flowId
            },
            select: {
                nodes: true,
                edges: true
            }
        })
        if (res?.nodes && res?.edges) return res
    } catch (error) {
        console.log(error);

    }

    //     setIsWorkFlowLoading(true)
    //     const response = await onGetNodesEdges(pathname.split('/').pop()!)
    //     if (response) {
    //       setEdges(JSON.parse(response.edges!))
    //       setNodes(JSON.parse(response.nodes!))
    //       setIsWorkFlowLoading(false)
    //     }
    //     setIsWorkFlowLoading(false)
    //   }

    //   useEffect(() => {
    //     onGetWorkFlow()
}