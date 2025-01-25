import { ConnectionProviderProps } from '@/providers/connections-provider'
import { EditorState } from '@/providers/editor-provider'
import React from 'react'
import ConnectionBasedOnTitle, { Option } from './content-based-on-title'
import { useFuzzieStore } from '@/store'

type Props = {
    nodeConnection: ConnectionProviderProps
    state: EditorState
}

const RenderOutputAccordion = ({ nodeConnection, state }: Props) => {
    const {
        googleFile,
        setGoogleFile,
        selectedSlackChannels,
        setSelectedSlackChannels,
    } = useFuzzieStore()
    return (
        <ConnectionBasedOnTitle
            nodeConnection={nodeConnection}
            newState={state}
            file={googleFile}
            setFile={setGoogleFile}
            selectedSlackChannels={selectedSlackChannels}
            setSelectedSlackChannels={setSelectedSlackChannels}
        />
    )
}

export default RenderOutputAccordion