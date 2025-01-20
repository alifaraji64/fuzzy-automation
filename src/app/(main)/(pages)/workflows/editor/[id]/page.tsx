import React from 'react'



function Editor({params}:any) {
    const {id} = params
  return (
    <><div>Editor</div><p>{id}</p></>
  )
}

export default Editor