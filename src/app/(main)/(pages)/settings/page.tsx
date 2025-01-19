import ProfileForm from '@/components/forms/profile-form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditUserProfileSchema } from '@/lib/types'
import ProfilePicture from '@/components/global/profile-picture'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
type Props = {}

async function Settings({ }: Props) {
  const authUser = await currentUser()
  if (!authUser) return null;
  let userFromDb = await db.user.findUnique({
    where: { clerkId: authUser.id }
  })
  if (!userFromDb) return null;
  const removeProfilePicture = async () => {
    'use server'
    try {
      const res = await db.user.update({
        where: {
          clerkId: authUser.id
        },
        data: {
          profileImage: ""
        }
      })
      console.log('deleted');

    } catch (error) {
      console.log('error deleting the profile picture');
      console.log(error);
    }
  }
  const addProfilePicture = async (image: string) => {
    'use server'
    try {
      console.log('adding profile picture to database');

      await db.user.update({
        where: {
          clerkId: authUser.id
        },
        data: {
          profileImage: image
        }
      })
    } catch (error) {
      console.log('error adding profile picture to db');

      console.log(error);

    }
  }
  const updateUserInfo = async (name: string) => {
    'use server'
    try {
      const updatedUser = await db.user.update({
        where: { clerkId: authUser.id },
        data: { name }
      })
      return updatedUser;
    } catch (error) {

    }
  }
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='sticky top-0 z-[10] flex
       items-center justify-between border-b
       bg-background/50 p-6 text-4xl'>
        <span>Settings</span>
      </h1>
      <div className='flex flex-col gap-10 p-6'>
        <div>
          <h2 className='text-2xl font-bold'>User Profile</h2>
          <p className='text-base text-white/50'>Add or Update Your Information</p>
        </div>
        <ProfilePicture
          userImage={userFromDb.profileImage!}
          removeProfilePicture={removeProfilePicture}
          addProfilePicture={addProfilePicture}
        />
        <ProfileForm
          name={userFromDb.name}
          email={authUser.emailAddresses[0].emailAddress}
          onUpdate={updateUserInfo}
        />
      </div>
    </div>
  )
}

export default Settings