import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

export async function GET (req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  // Check if the code parameter is missing
  if (!code) return new NextResponse('Code not provided', { status: 400 })

  const encoded = Buffer.from(
    `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_API_SECRET}`
  ).toString('base64')
  try {
    const response = await fetch('https://api.notion.com/v1/oauth/token', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Basic ${encoded}`,
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.NOTION_REDIRECT_URI!
      })
    })
    const data = await response.json()
    if (!data) {
      console.log('notion OAuth failed')
      throw new Error('notion OAuth failed')
    }

    const notion = new Client({
      auth: data.access_token
    })
    const databasesPages = await notion.search({
      filter: {
        value: 'database',
        property: 'object'
      },
      sort: {
        direction: 'ascending',
        timestamp: 'last_edited_time'
      }
    })
    const databaseId = databasesPages?.results?.length
      ? databasesPages.results[0].id
      : ''

    console.log(databaseId)

    return NextResponse.redirect(
      `https://localhost:3000/connections?access_token=${data.access_token}&workspace_name=${data.workspace_name}&workspace_icon=${data.workspace_icon}&workspace_id=${data.workspace_id}&database_id=${databaseId}`
    )
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }

}
