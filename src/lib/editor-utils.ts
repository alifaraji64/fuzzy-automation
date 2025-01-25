import { ConnectionProviderProps } from "@/providers/connections-provider";
import { EditorCanvasCardType, EditorCanvasTypes } from "./types";

export const onDragStart = (
    event:React.DragEvent,
    nodeType:EditorCanvasTypes
)=>{
    event.dataTransfer.setData('application/reactflow',nodeType);
    event.dataTransfer.effectAllowed='move'
}
export const onSlackContent = (
    nodeConnection:ConnectionProviderProps,
    event:React.ChangeEvent<HTMLInputElement>
)=>{
    nodeConnection.setSlackNode((prev:any)=>{
        return {
            ...prev,
            content:event.target.value
        }
    })
}
export const onDiscordContent = (
    nodeConnection:ConnectionProviderProps,
    event:React.ChangeEvent<HTMLInputElement>
)=>{
    nodeConnection.setDiscordNode((prev:any)=>{
        return {
            ...prev,
            content:event.target.value
        }
    })
}
export const onContentChange = (
    nodeConnection:ConnectionProviderProps,
    nodeType:string,
    event:React.ChangeEvent<HTMLInputElement>
)=>{
    if(nodeType=='Slack')return onSlackContent(nodeConnection,event)
    if(nodeType=='Discord') return onDiscordContent(nodeConnection,event)
}
const onAddTemplateSlack = (
    nodeConnection:ConnectionProviderProps,
    template:string
)=>{
    nodeConnection.setSlackNode((prev:any)=>{
        return {
            ...prev,
            content:prev.content+' '+template
        }
    })
}
const onAddTemplateDiscord = (
    nodeConnection:ConnectionProviderProps,
    template:string
)=>{
    nodeConnection.setDiscordNode((prev:any)=>{
        return {
            ...prev,
            content:prev.content+' '+template
        }
    })
}

export const onAddTemplate = (
    nodeConnection:ConnectionProviderProps,
    title: string,
    template:string
)=>{
    if(title=='Slack')return onAddTemplateSlack(nodeConnection,template)
    if(title=='Discord')return onAddTemplateDiscord(nodeConnection,template)
}