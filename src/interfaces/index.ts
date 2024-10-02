import { Editor } from '@tiptap/core';
import { EditorState } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type Alphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
export type Alphanumeric = Alphabet | Digit;

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
