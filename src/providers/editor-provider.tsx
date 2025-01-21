'use client'

import { EditorActions, EditorNodeType } from '@/lib/types';
import React, { Dispatch, useReducer, useContext, useEffect } from 'react'
import { createContext } from 'vm';



export type Editor = {
    elements: EditorNodeType[],
    edges: {
        id: string,
        source: string,
        target: string
    }[],
    selectedNode: EditorNodeType
}

export type HistoryState = {
    history: Editor[],
    currentIndex: number
}

export type EditorState = {
    editor: Editor,
    history: HistoryState
}
const initialEditorState: EditorState['editor'] = {
    elements: [],
    edges: [],
    selectedNode: {
        id: '',
        type: 'Trigger',
        position: {
            x: 0,
            y: 0
        },
        data: {
            title: '',
            description: '',
            completed: false,
            current: false,
            metadata: undefined,
            type: 'Trigger'
        }
    }
}

const initialHistoryState: EditorState['history'] = {
    history: [],
    currentIndex: 0
}
const initialState: EditorState = {
    editor: initialEditorState,
    history: initialHistoryState
}
const editorReducer = (
    state: EditorState = initialState,
    action: EditorActions
): EditorState => {
    switch (action.type) {
        case 'REDO':
            if (state.history.currentIndex < state.history.history.length - 1) {
                const nextIndex = state.history.currentIndex + 1;
                const nextEditorState = { ...state.history.history[nextIndex] }
                const redoState: EditorState = {
                    ...state,
                    editor: nextEditorState,
                    history: {
                        ...state.history,
                        currentIndex: nextIndex
                    }
                }
                return redoState
            }
            return state;

        case 'UNDO':
            if (state.history.currentIndex > 0) {
                const prevIndex = state.history.currentIndex - 1;
                const prevEditorState = { ...state.history.history[prevIndex] }
                const undoState: EditorState = {
                    ...state,
                    editor: prevEditorState,
                    history: {
                        ...state.history,
                        currentIndex: prevIndex
                    }
                }
                return undoState;
            }
            return state;
        case 'LOAD_DATA':
            return {
                ...state,
                editor: {
                    ...state.editor,
                    elements: action.payload.elements,
                    edges: action.payload.edges
                }
            }
        case 'UPDATE_NODE':
            return {
                ...state,
                editor: {
                    ...state.editor,
                    elements: action.payload.elements
                }
            }
        case 'SELECTED_ELEMENT':
            return {
                ...state,
                editor: {
                    ...state.editor,
                    selectedNode: action.payload.element
                }
            }

        default:
            return state;
    }
}

export type EditorContextData = {
    previewMode: boolean;
    setPreviewMode: (previewMode: boolean) => void;
}

export const EditorContext = createContext<{
    state: EditorState
    dispatch: Dispatch<EditorActions>
  }>({
    state: initialState,
    dispatch: () => undefined,
  })

const EditorProvider = (props: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(editorReducer, initialState)

    return (
        <EditorContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {props.children}
        </EditorContext.Provider>
    )
}

export const useEditor = () => {
    const context = useContext(EditorContext)
    if (!context) {
      throw new Error('useEditor Hook must be used within the editor Provider')
    }
    return context
  }

export default EditorProvider
