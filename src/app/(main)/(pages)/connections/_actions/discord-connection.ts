'use server'

import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'

export const onDiscordConnect = async (
  channel_id: string,
  webhook_id: string,
  webhook_name: string,
  webhook_url: string,
  id: string,
  guild_name: string,
  guild_id: string
) => {
  if (!webhook_id) return
  const webhook = await db.discordWebhook.findFirst({
    where: {
      userId: id
    },
    include: {
      connections: {
        select: {
          type: true
        }
      }
    }
  })
  if (!webhook) {
    await db.discordWebhook.create({
      data: {
        userId: id,
        webhookId: webhook_id,
        channelId: channel_id!,
        guildId: guild_id!,
        name: webhook_name!,
        url: webhook_url!,
        guildName: guild_name!,
        connections: {
          //this automatically creates a row inside the connection
          //table with the passed props also with the webhookId inside
          //the connections table which is the same as the id in the
          //discordWebhook table
          create: {
            userId: id,
            type: 'Discord'
          }
        }
      }
    })
  }
  if (webhook) {
    //check if channelId is set in the row
    const webhook_channel = await db.discordWebhook.findUnique({
      where: {
        channelId: channel_id
      },
      include: {
        connections: {
          select: {
            type: true
          }
        }
      }
    })
    if (!webhook_channel) {
      await db.discordWebhook.create({
        data: {
          userId: id,
          webhookId: webhook_id,
          channelId: channel_id!,
          guildId: guild_id!,
          name: webhook_name!,
          url: webhook_url!,
          guildName: guild_name!,
          connections: {
            create: {
              userId: id,
              type: 'Discord'
            }
          }
        }
      })
    }
  }
}

export const getDiscordConnectionUrl = async () => {
  try {
    const user = await currentUser()
    if (!user) throw new Error('user is required for getDiscordConnectionUrl')
    const webhook = await db.discordWebhook.findFirst({
      where: {
        userId: user.id
      },
      select: {
        url: true,
        name: true,
        guildName: true
      }
    })
    return webhook
  } catch (error) {
    console.log(error)
  }
}
