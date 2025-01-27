import { CONNECTIONS } from '@/lib/constants'
import React from 'react'
import ConnectionCard from './_components/connection-card'
import { currentUser } from '@clerk/nextjs/server'
import { onDiscordConnect } from './_actions/discord-connection'
import { onNotionConnect } from './_actions/notion-connection'
import { onSlackConnect } from './_actions/slack-connection'
import { getUserData } from './_actions/get-user-data'

type Props = {
    searchParams?: { [key: string]: string | undefined }

}

async function Connections({ searchParams }: Props) {
    const {
        webhook_id,
        webhook_name,
        webhook_url,
        guild_id,
        guild_name,
        channel_id,
        access_token,
        workspace_name,
        workspace_icon,
        workspace_id,
        database_id,
        app_id,
        authed_user_id,
        authed_user_token,
        slack_access_token,
        bot_user_id,
        team_id,
        team_name,
    } = searchParams ?? {
        webhook_id: '',
        webhook_name: '',
        webhook_url: '',
        guild_id: '',
        guild_name: '',
        channel_id: '',
        access_token: '',
        workspace_name: '',
        workspace_icon: '',
        workspace_id: '',
        database_id: '',
        app_id: '',
        authed_user_id: '',
        authed_user_token: '',
        slack_access_token: '',
        bot_user_id: '',
        team_id: '',
        team_name: '',
    }
    const user = await currentUser()
    if (!user) return null;
    const Connections = async () => {
        console.log(database_id)
        await onDiscordConnect(
            channel_id!,
            webhook_id!,
            webhook_name!,
            webhook_url!,
            user.id,
            guild_name!,
            guild_id!
        )
        await onNotionConnect(
            access_token!,
            workspace_id!,
            workspace_icon!,
            workspace_name!,
            database_id!,
            user.id
        )

        await onSlackConnect(
            app_id!,
            authed_user_id!,
            authed_user_token!,
            slack_access_token!,
            bot_user_id!,
            team_id!,
            team_name!,
            user.id
        )
        const connections: any = {}

        const user_info = await getUserData(user.id)
        user_info?.connections.map(connection => {
            connections[connection.type] = true
        })
        return {...connections,'Google Drive':true}
    }
    const connections = await Connections()
    return (
        <div className='flex flex-col gap-4'>
            <h1 className='sticky top-0 z-[10] flex
       items-center justify-between border-b
       bg-background/50 p-6 text-4xl'>
                <span>Connections</span>
            </h1>
            <div className="relative flex flex-col gap-4">
                <section className='flex flex-col
                 gap-4 p-6 text-muted-foreground'>
                    Connect all your apps directly from here. you may need to connect
                    the apps regularly to refresh verification
                    {CONNECTIONS.map(connection => (
                        <ConnectionCard
                            title={connection.title}
                            description={connection.description}
                            key={connection.title}
                            icon={connection.image}
                            type={connection.title}
                            // callBack={()=>{}}
                            connected={connections}
                        />
                    ))}
                </section>
            </div>
        </div>
    )
}

export default Connections