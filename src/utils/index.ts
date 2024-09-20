import { Editor } from '@tiptap/core';
import { EditorPredicate } from '../interfaces';

export const getEditorPredicate = (predicate: EditorPredicate | undefined, editor: Editor, defaultValue: boolean = false) => {
    if (!predicate)
        return defaultValue;

    if (typeof predicate === 'boolean')
        return predicate;

    return predicate({ editor, view: editor.view, state: editor.state });
};

export * from './ribbon';
