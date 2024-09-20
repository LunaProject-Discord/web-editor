import { Editor } from '@tiptap/core';
import { EditorState } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';

export interface EditorActionProps {
    editor: Editor;
    view: EditorView;
    state: EditorState;
}

export type EditorAction = (props: EditorActionProps) => boolean;
export type EditorPredicate = boolean | EditorAction;

export interface EditorDivider {
    type: 'divider';
}

export * from './command';
export * from './ribbon';
