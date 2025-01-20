import React from 'react'
import WorkflowButton from './_components/workflow-button'
import WorkFlows from './_components'

type Props = {}

function Page({}: Props) {
  return (
    <div className='flex flex-col gap-4 w-full'>
            <h1 className='sticky top-0 z-[10] flex
       items-center justify-between border-b w-full
       bg-background/50 p-6 text-4xl'>
                <span>Workflows</span>
                <WorkflowButton></WorkflowButton>
            </h1>
            <WorkFlows />
        </div>
  )
}

export default Page