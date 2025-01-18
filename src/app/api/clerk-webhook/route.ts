import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST (req: Request) {
  console.log('loooooo')

  const body = await req.json()
  const { id, email_addresses, first_name, image_url } = body?.data

  const email = email_addresses[0]?.email_address
  console.log('wohooo' + body)
  try {
    await db.user.upsert({
      where: {
        clerkId: id
      },
      update: {
        email,
        name: first_name,
        profileImage: image_url
      },
      create: {
        email,
        clerkId: id,
        profileImage: image_url,
        name: first_name
      }
    })

    return new NextResponse('user updated succesfully', {
      status: 200
    })
  } catch (error) {
    console.error('error updating database: ', error)
    return new NextResponse('error uploading user in db', {
      status: 500
    })
  }
}
export async function GET (req: Request) {
  return new NextResponse('user updated succesfully', {
    status: 200
  })
}
