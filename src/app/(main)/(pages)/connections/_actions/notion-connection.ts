'use server'

import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { Client } from '@notionhq/client'
export const onNotionConnect = async (
  access_token: string,
  workspace_id: string,
  workspace_icon: string,
  workspace_name: string,
  database_id: string,
  id: string
) => {
  if (!access_token) return
  const notion_connected = await db.notion.findFirst({
    where: {
      accessToken: access_token
    },
    include: {
      connections: {
        select: {
          type: true
        }
      }
    }
  })
  if (!notion_connected) {
    await db.notion.create({
      data: {
        userId: id,
        workspaceIcon: workspace_icon!,
        accessToken: access_token,
        workspaceId: workspace_id!,
        workspaceName: workspace_name!,
        databaseId: database_id,
        connections: {
          create: {
            userId: id,
            type: 'Notion'
          }
        }
      }
    })
  }
}
export const getNotionConnection = async () => {
  try {
    const user = await currentUser()
    if (!user) throw new Error('user is required for getNotionConnection')
    return await db.notion.findFirst({
      where: {
        userId: user.id
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const getNotionDatabase = async (
  databaseId: string,
  accessToken: string
) => {
  const notion = new Client({
    auth: accessToken
  })
  return await notion.databases.retrieve({ database_id: databaseId })
}
