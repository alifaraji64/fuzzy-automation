'use server'
import { db } from "@/lib/db";
import { Option } from "@/store";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";

export const onSlackConnect = async (
    app_id: string,
    authed_user_id: string,
    authed_user_token: string,
    slack_access_token: string,
    bot_user_id: string,
    team_id: string,
    team_name: string,
    user_id: string
) => {
    if (!slack_access_token) return;
    const slackConnection = await db.slack
        .findFirst({
            where: { slackAccessToken: slack_access_token },
            include: { connections: true },
        })
    if (!slackConnection) {
        await db.slack.create({
            data: {
                userId: user_id,
                appId: app_id,
                authedUserId: authed_user_id,
                authedUserToken: authed_user_token,
                slackAccessToken: slack_access_token,
                botUserId: bot_user_id,
                teamId: team_id,
                teamName: team_name,
                connections: {
                    create: { userId: user_id, type: 'Slack' },
                },
            }
        })
    }
}

export const getSlackConnection = async () => {
    try {
        const user = await currentUser()
        if (!user) throw new Error('user is required for getSlackConnection')
        return await db.slack.findFirst({
            where: {
                userId: user.id
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const listBotChannels = async (token: string): Promise<Option[]> => {
    const url = `https://slack.com/api/conversations.list?${new URLSearchParams({
        types: 'public_channel,private_channel',
        limit: '200',
    })}`
    try {
        const { data } = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        })
        if (!data.ok) throw new Error(data.error)
        if (!data?.channels?.length) return [];
        return data.channels.filter((channel: any) => channel.is_member)
            .map((channel: any) => {
                return{ label: channel.name, value: channel.id }
            })
    } catch (error:any) {
        console.log('error listing bot channels: ', error.message);
        throw error;
}
}
