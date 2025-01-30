import React from 'react'
import Workflow from './workflow'
import { onGetWorkFlows } from '../_actions/workflow-connections'

type Props = {}

async function WorkFlows({ }: Props) {
    const workflows = await onGetWorkFlows()
    return (
        <div className='relative flex flex-col gap-4'>
            <section className='flex flex-col gap-4 p-6'>
                {workflows?.length ?
                    workflows?.map((workflow) => (
                        <Workflow
                            key={workflow.id}
                            {...workflow}
                        />
                    )) : (
                        <div className='text-muted-foreground flex items-center justify-center'>
                            No WorkFlows
                        </div>
                    )
                }

            </section>
        </div>
    )
}

export default WorkFlows