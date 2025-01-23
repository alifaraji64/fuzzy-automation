import { ConnectionsProvider } from '@/providers/connections-provider'
import EditorProvider from '@/providers/editor-provider'
import React from 'react'
import EditorCanvas from './_components/editor-canvas'



async function Editor({ params }: any) {
  const { id } = await params
  return (
    <>
      <EditorProvider>
        <ConnectionsProvider>
          <EditorCanvas></EditorCanvas>
        </ConnectionsProvider>
      </EditorProvider>
    </>
  )
}

export default Editor