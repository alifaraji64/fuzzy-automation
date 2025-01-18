import React from 'react'
import UploadCareButton from './upload-care-button'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '../ui/button'

type Props = { userImage?: string, removeProfilePicture: () => void }

function ProfilePicture({ userImage,removeProfilePicture }: Props) {
    return (
        <div className='flex flex-col'>
            <p className='text-lg text-white'>Profile Picture</p>
            <div className='flex h-[30vh] flex-col items-center justify-center'>
                {userImage ?
                    <div>
                        <Image alt='test' width={100} height={100} src={'https://ucarecdn.com/c5db0f17-ff21-44d7-8224-4170ee2e6f8a/bd2ebb2a8d6644f4b348faa37c0ab816.jpg'} />
                        <Button onClick={removeProfilePicture}>
                            <X/>Remove Picture
                        </Button>
                    </div>
                    : <UploadCareButton />}
            </div>
        </div>
    )
}

export default ProfilePicture