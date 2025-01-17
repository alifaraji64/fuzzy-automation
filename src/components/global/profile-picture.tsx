import React from 'react'
import UploadCareButton from './upload-care-button'

type Props = { userImage?: string }

function ProfilePicture({ userImage }: Props) {
    return (
        <div className='flex flex-col'>
            <p className='text-lg text-white'>Profile Picture</p>
            <div className='flex h-[30vh] flex-col items-center justify-center'>
                {userImage ? '' : <UploadCareButton />}
            </div>
        </div>
    )
}

export default ProfilePicture