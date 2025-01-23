import { EditorCanvasCardType, EditorCanvasTypes } from "./types";

export const onDragStart = (
    event:React.DragEvent,
    nodeType:EditorCanvasTypes
)=>{
    event.dataTransfer.setData('application/reactflow',nodeType);
    event.dataTransfer.effectAllowed='move'
}