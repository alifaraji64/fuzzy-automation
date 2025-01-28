import React from 'react'
import Workflow from './workflow'

type Props = {}

function WorkFlows({ }: Props) {
    return (
        <div className='relative flex flex-col gap-4'>
            <section className='flex flex-col gap-4 p-6'>
                <Workflow
                    description='creating a test workflow'
                    name='automation workflow'
                    id='534535'
                    publish={true}
                     />
                <Workflow
                    description='creating a test workflow'
                    name='automation workflow'
                    id='534535'
                    publish={false}
                     />
                <Workflow
                    description='creating a test workflow'
                    name='automation workflow'
                    id='534535'
                    publish={false}
                     />
                <Workflow
                    description='creating a test workflow'
                    name='automation workflow'
                    id='534535'
                    publish={false}
                     />
            </section>
        </div>
    )
}

export default WorkFlows