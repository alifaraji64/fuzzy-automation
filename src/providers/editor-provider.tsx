'use client'

import { EditorActions, EditorNodeType } from '@/lib/types';
import { Dispatch, useReducer, useContext, useEffect } from 'react'



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
            if (state.history.currentIndex < state.history.history.length - 1){
                const nextIndex = state.history.currentIndex-1;
                const nextEditorState = {...state.history.history[nextIndex]}
                const redoState = {
                    ...state,
                    editor:nextEditorState,
                    history:{
                        ...state.history,
                        currentIndex:nextIndex
                    }
                }
                return redoState
            }
                return state;

        default:
            return state;
    }
}