import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

type Props = {}

function WorkflowButton({ }: Props) {
    const handleClick = () => { }
    return (
        <Button size={'icon'} onClick={handleClick}>
            <Plus></Plus>
        </Button>
    )
}

export default WorkflowButton