import { ConnectionProviderProps } from '@/providers/connections-provider'
import { EditorCanvasCardType, EditorCanvasTypes } from './types'
import { EditorState } from '@/providers/editor-provider'
import { getDiscordConnectionUrl } from '@/app/(main)/(pages)/connections/_actions/discord-connection'
import {
  getNotionConnection,
  getNotionDatabase
} from '@/app/(main)/(pages)/connections/_actions/notion-connection'
import { getSlackConnection, listBotChannels } from '@/app/(main)/(pages)/connections/_actions/slack-connection'
import { Option } from '@/store'

export const onDragStart = (
  event: React.DragEvent,
  nodeType: EditorCanvasTypes
) => {
  event.dataTransfer.setData('application/reactflow', nodeType)
  event.dataTransfer.effectAllowed = 'move'
}
export const onSlackContent = (
  nodeConnection: ConnectionProviderProps,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  nodeConnection.setSlackNode((prev: any) => {
    return {
      ...prev,
      content: event.target.value
    }
  })
}
export const onDiscordContent = (
  nodeConnection: ConnectionProviderProps,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  nodeConnection.setDiscordNode((prev: any) => {
    return {
      ...prev,
      content: event.target.value
    }
  })
}
export const onNotionContent = (
  nodeConnection: ConnectionProviderProps,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  nodeConnection.setNotionNode((prev: any) => ({
    ...prev,
    content: event.target.value,
  }))
}
export const onContentChange = (
  nodeConnection: ConnectionProviderProps,
  nodeType: string,
  event: React.ChangeEvent<HTMLInputElement>
) => {
  if (nodeType == 'Slack') return onSlackContent(nodeConnection, event)
  if (nodeType == 'Discord') return onDiscordContent(nodeConnection, event)
  if (nodeType == 'Notion') return onNotionContent(nodeConnection, event)
}
const onAddTemplateSlack = (
  nodeConnection: ConnectionProviderProps,
  template: string
) => {
  nodeConnection.setSlackNode((prev: any) => {
    return {
      ...prev,
      content: prev.content + ' ' + template
    }
  })
}
const onAddTemplateDiscord = (
  nodeConnection: ConnectionProviderProps,
  template: string
) => {
  nodeConnection.setDiscordNode((prev: any) => {
    return {
      ...prev,
      content: prev.content + ' ' + template
    }
  })
}

export const onAddTemplate = (
  nodeConnection: ConnectionProviderProps,
  title: string,
  template: string
) => {
  if (title == 'Slack') return onAddTemplateSlack(nodeConnection, template)
  if (title == 'Discord') return onAddTemplateDiscord(nodeConnection, template)
}

export const onConnections = async (
  nodeConnection: ConnectionProviderProps,
  editorState: EditorState,
  googleFile: any
) => {
  //setting all the discord details from database to our context
  if (editorState.editor.selectedNode.data.title == 'Discord') {
    const connection = await getDiscordConnectionUrl()
    if (connection) {
      nodeConnection.setDiscordNode({
        webhookURL: connection.url,
        content: '',
        webhookName: connection.name,
        guildName: connection.guildName
      })
    }
  }
  if (editorState.editor.selectedNode.data.title == 'Notion') {
    const connection = await getNotionConnection()
    if (connection) {
      nodeConnection.setNotionNode({
        accessToken: connection.accessToken,
        databaseId: connection.databaseId,
        workspaceName: connection.workspaceName,
        content: {
          name: googleFile.name,
          kind: googleFile.kind,
          type: googleFile.mimeType
        }
      })
      if (nodeConnection.notionNode.databaseId == '') return
      const response = await getNotionDatabase(
        nodeConnection.notionNode.databaseId,
        nodeConnection.notionNode.accessToken
      )
    }
  }
  if (editorState.editor.selectedNode.data.title == 'Slack') {
    const connection = await getSlackConnection()
    if (connection) {
      nodeConnection.setSlackNode({
        appId: connection.appId,
        authedUserId: connection.authedUserId,
        authedUserToken: connection.authedUserToken,
        slackAccessToken: connection.slackAccessToken,
        botUserId: connection.botUserId,
        teamId: connection.teamId,
        teamName: connection.teamName,
        userId: connection.userId,
        content: '',
      })
    }
  }
}

export const fetchBotSlackChannels = (
  token: string,
  setSlackChannels: (slackChannels: Option[]) => void
) => {
  listBotChannels(token)?.then((channels: any) => setSlackChannels(channels))
}
