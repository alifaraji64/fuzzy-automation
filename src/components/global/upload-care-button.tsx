'use client'
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

type Props = {
  addProfilePicture:(image:string)=>void
}
interface UploadcareFile {
    uuid: string;
    name: string;
    size: number;
    isImage: boolean;
    mimeType: string;
    cdnUrl: string;
    status:string;
    [key: string]: any; // Add additional properties if needed
  }

 function UploadCareButton({addProfilePicture}: Props) {
    const router = useRouter();
    const [files, setFiles] = useState<UploadcareFile[]>([]);
    const [hasRefreshed, setHasRefreshed] = useState(false);
  const handleChangeEvent = async(e:any) => {
    const successfulFiles = e.allEntries
    ?.filter((file: any) => file.status === "success")
    .map((file: any) => ({
      uuid: file.uuid,
      name: file.name,
      size: file.size,
      isImage: file.isImage,
      mimeType: file.mimeType,
      cdnUrl: file.cdnUrl || file.originalUrl, // Adjust based on structure
      status: file.status,
    }));
    setFiles(successfulFiles || []);
  };
  if (files.length > 0 && files[0].cdnUrl && !hasRefreshed) {
    setHasRefreshed(true)
    console.log("Upload was successful");
    addProfilePicture(files[0].cdnUrl);
    router.refresh();
  }

  console.log(files[0]);
  return (
    <div>
      <FileUploaderRegular
         sourceList="local, url, camera, dropbox"
         classNameUploader="uc-light"
         pubkey="8d0e32bfea669ce6e451"
         onChange={handleChangeEvent}
      />
    </div>
  )
}

export default UploadCareButton

// cdnUrl
// :
// "https://ucarecdn.com/194cdd40-2b9e-483b-be26-3a00c3295584/"
// cdnUrlModifiers
// :
// ""
// errors
// :
// []
// externalUrl
// :
// null
// file
// :
// File {name: 'animated thomas shelby.jpg', lastModified: 1680214437468, lastModifiedDate: Fri Mar 31 2023 01:43:57 GMT+0330 (Iran Standard Time), webkitRelativePath: '', size: 299201, …}
// fileInfo
// :
// UploadcareFile {uuid: '194cdd40-2b9e-483b-be26-3a00c3295584', name: 'animatedthomasshelby.jpg', size: 299201, isStored: true, isImage: true, …}
// fullPath
// :
// null
// internalId
// :
// "c5ySiOMkR-L9q"
// isFailed
// :
// false
// isImage
// :
// true
// isRemoved
// :
// false
// isSuccess
// :
// true
// isUploading
// :
// false
// metadata
// :
// {}
// mimeType
// :
// "image/jpeg"
// name
// :
// "animated thomas shelby.jpg"
// size
// :
// 299201
// source
// :
// "local"
// status
// :
// "success"
// uploadProgress
// :
// 100
// uuid
// :
// "194cdd40-2b9e-483b-be26-3a00c3295584"
// [[Prototype]]
// :
// Object