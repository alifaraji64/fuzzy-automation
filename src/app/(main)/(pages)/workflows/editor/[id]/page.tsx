import { ConnectionsProvider } from '@/providers/connections-provider'
import EditorProvider from '@/providers/editor-provider'
import React from 'react'
import EditorCanvas from './_components/editor-canvas'



async function Editor({ params }: any) {
  const { id } = await params
  return (
    <div>
      <EditorProvider>
        <ConnectionsProvider>
          <>
          <EditorCanvas></EditorCanvas>
          </>
        </ConnectionsProvider>
      </EditorProvider>
    </div>
  )
}

export default Editor