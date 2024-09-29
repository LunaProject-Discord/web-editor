'use client';

import { Editor } from '@tiptap/core';
import { useCurrentEditor as useTiptapCurrentEditor } from '@tiptap/react';

export interface EditorComponentProps {
    editor?: Editor;
}

export const useCurrentEditor = (editor: Editor | undefined) => {
    const { editor: currentEditor } = useTiptapCurrentEditor();
    return editor ?? currentEditor ?? undefined;
};

export * from './Ribbon';
