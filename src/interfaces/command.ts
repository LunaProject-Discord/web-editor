import { ComponentType, ReactNode } from 'react';
import { EditorAction, EditorPredicate } from './index';

export interface EditorCommand {
    type?: 'command';
    name: string;
    icon?: ComponentType;
    label?: ReactNode;
    description?: ReactNode;
    keywords?: string[];
    disabled?: EditorPredicate;
    selected?: EditorPredicate;
    perform: EditorAction;
}
