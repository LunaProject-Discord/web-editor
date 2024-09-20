'use client';

import { Editor } from '@tiptap/core';
import { useCurrentEditor as useTiptapCurrentEditor } from '@tiptap/react';

export interface EditorComponentProps {
    editor?: Editor;
}

export const useCurrentEditor = (editor: Editor | undefined) => {
    if (editor)
        return editor;

    const { editor: currentEditor } = useTiptapCurrentEditor();
    return currentEditor;
};

export * from './Ribbon';
