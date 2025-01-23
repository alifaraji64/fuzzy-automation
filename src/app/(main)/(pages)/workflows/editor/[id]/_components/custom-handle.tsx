import { useEditor } from '@/providers/editor-provider'
import { Handle, HandleProps, Position, useStore } from '@xyflow/react'
import React, { CSSProperties } from 'react'

type Props = HandleProps & { style: CSSProperties | undefined }

const selector = (s: any) => ({
    nodeInternals: s.nodeInternals,
    edges: s.edges
})

function CustomHandle(props: Props) {
    const { state } = useEditor();
    return (
        <Handle
            {...props}
            isValidConnection={(e) => {
                //number of the edges which have the same source as the one we are connecting from
                const sourcesFromHandleInState = state.editor.edges
                    .filter(edge => edge.source == e.source).length
                const sourceNode = state.editor.elements
                    .find(node => node.id === e.source)
                const targetFromHandleInState = state.editor.edges
                    .filter(edge => edge.target == e.target).length

                if (sourceNode?.type === 'Condition') return true
                if (sourcesFromHandleInState >= 1) return false
                if (targetFromHandleInState >= 1) return false
                return true
            }}
            className='!-bottom-2 !h-4 !w-4 dark:bg-neutral-800' />
    )
}

export default CustomHandle