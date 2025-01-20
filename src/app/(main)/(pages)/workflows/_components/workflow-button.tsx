'use client'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'
import { Plus } from 'lucide-react'
import React from 'react'
import WorkflowForm from './workflow-form'

type Props = {}

function WorkflowButton({ }: Props) {
    const { setOpen, setClose } = useModal()
    const handleClick = () => {
        setOpen(
            <CustomModal
                children={<WorkflowForm
                    title='Create a Workflow Automation'
                    subHeading='Workflows Help you Automate Boring Tasks' />}
                defaultOpen={false}
            />, async () => {
                return {}
            })
    }
    return (
        <Button size={'icon'} onClick={handleClick}>
            <Plus></Plus>
        </Button>
    )
}

export default WorkflowButton