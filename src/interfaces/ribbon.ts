import { TooltipProps } from '@mui/material';
import { ReactNode } from 'react';
import { Alphanumeric, EditorCommand, EditorDivider, EditorPredicate } from './index';

export interface EditorRibbonAccessKeyRoot {
    accessKey?: EditorRibbonAccessKey;
}

export interface EditorRibbonTooltipRoot {
    tooltip?: EditorRibbonTooltip;
}

export interface EditorRibbonTab extends EditorRibbonAccessKeyRoot {
    type?: 'ribbonTab';
    name: string;
    label: ReactNode;
    visible?: EditorPredicate;
    content: EditorRibbonTabItem[];
}

export type EditorRibbonTabItem = EditorRibbonGroup | EditorDivider;

export interface EditorRibbonGroup extends EditorRibbonAccessKeyRoot {
    type?: 'ribbonGroup';
    name: string;
    label?: ReactNode;
    content: EditorRibbonGroupItem[];
}

export type EditorRibbonGroupItem = EditorRibbonButton | EditorRibbonDropdownButton | EditorDivider;

export type EditorRibbonGroupItemRoot = EditorRibbonAccessKeyRoot & EditorRibbonTooltipRoot;

export interface EditorRibbonButton extends Omit<EditorCommand, 'type' | 'description' | 'keywords'>, EditorRibbonGroupItemRoot {
    type?: 'ribbonButton';
}

export interface EditorRibbonDropdownButton extends Omit<EditorCommand, 'type' | 'keywords' | 'perform'>, EditorRibbonGroupItemRoot {
    type: 'ribbonDropdownButton';
    options: EditorRibbonDropdownButtonItem[];
}

export type EditorRibbonDropdownButtonItem = EditorRibbonDropdownButtonOption | EditorDivider;

export interface EditorRibbonDropdownButtonOption extends Omit<EditorCommand, 'type' | 'keywords'>, EditorRibbonAccessKeyRoot {
    type?: 'ribbonDropdownOption';
    label: ReactNode;
}

export type EditorRibbonAccessKey = Alphanumeric | `${Alphanumeric}${Alphanumeric}`;

export interface EditorRibbonTooltip {
    children: ReactNode;
    placement?: TooltipProps['placement'];
}
