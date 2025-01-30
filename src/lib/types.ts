import { ConnectionProviderProps } from '@/providers/connections-provider'
import { z } from 'zod'

export const EditUserProfileSchema = z.object({
  email: z.string().email('Required'),
  name: z.string().min(1, 'Required')
})
export const WorkflowSchema = z.object({
  title: z.string().min(3, 'Required'),
  description: z.string().min(3, 'Required')
})

export type ConnectionTypes = 'Google Drive' | 'Notion' | 'Slack' | 'Discord'

export type Connection = {
  title: ConnectionTypes
  description: string
  image: string
  connectionKey: keyof ConnectionProviderProps
  accessTokenKey?: string
  alwaysTrue?: boolean
  slackSpecial?: boolean
}
export type EditorCanvasTypes =
  | 'Email'
  | 'Condition'
  | 'AI'
  | 'Slack'
  | 'Google Drive'
  | 'Notion'
  | 'Custom Webhook'
  | 'Google Calendar'
  | 'Trigger'
  | 'Action'
  | 'Wait'
export type EditorCanvasCardType = {
  title: string
  description: string
  completed: boolean
  current: boolean
  metadata: any
  type: EditorCanvasTypes
}

export type EditorNodeType = {
  id: string
  type: EditorCanvasTypes
  position: {
    x: number
    y: number
  }
  data: EditorCanvasCardType
}

export type EditorActions = |{
  type:'LOAD_DATA',
  payload:{
    elements:EditorNodeType[],
    edges:{
      source:string,
      target:string,
      id:string
    }[]
  }
}
|
{
  type:'UPDATE_NODE',
  payload:{
    elements:EditorNodeType[],
  }
}
|{type:'REDO'}
|{type:'UNDO'}
|{
  type:'SELECTED_ELEMENT',
  payload:{
    element:EditorNodeType
  }
}