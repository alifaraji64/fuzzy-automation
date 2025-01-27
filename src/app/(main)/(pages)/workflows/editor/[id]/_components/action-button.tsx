import { ConnectionProviderProps } from '@/providers/connections-provider'
import React from 'react'
import { Option } from './content-based-on-title'
type Props = {
    currentService: String,
    nodeConnection: ConnectionProviderProps,
    channels: Option[],
    setChannels: (value: Option[]) => void
}

function ActionButton({
    currentService, nodeConnection, channels, setChannels
}: Props) {
    return (
        <div>ActionButton</div>
    )
}

export default ActionButton