'use client'
import React from 'react'
import UploadCareButton from './upload-care-button'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

type Props = {
    userImage?: string,
    removeProfilePicture: () => void
    addProfilePicture: (image:string)=>void
}

function ProfilePicture({ userImage, removeProfilePicture, addProfilePicture }: Props) {
    const router = useRouter();
    return (
        <div className='flex flex-col'>
            <p className='text-lg text-white'>Profile Picture</p>
            <div className='flex h-[30vh] flex-col items-center justify-center'>
                {userImage ?
                    <div className='flex flex-col items-center gap-3'>
                        <Image alt='test' width={200} height={200} src={userImage} />
                        <Button onClick={()=>{
                            removeProfilePicture();
                            router.refresh()
                        }}>
                            <X />Remove Picture
                        </Button>
                    </div>
                    : <UploadCareButton addProfilePicture={addProfilePicture}/>}
            </div>
        </div>
    )
}

export default ProfilePicture