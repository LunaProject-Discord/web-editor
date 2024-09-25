import { TooltipProps } from '@mui/material';
import { ReactNode } from 'react';
import { EditorCommand, EditorDivider, EditorPredicate } from './index';

export interface EditorRibbonTab {
    type?: 'ribbonTab';
    name: string;
    label: ReactNode;
    visible?: EditorPredicate;
    content: EditorRibbonTabItem[];
}

export type EditorRibbonTabItem = EditorRibbonGroup | EditorDivider;

export interface EditorRibbonGroup {
    type?: 'ribbonGroup';
    name: string;
    label?: ReactNode;
    content: EditorRibbonGroupItem[];
}

export type EditorRibbonGroupItem = EditorRibbonButton | EditorRibbonDropdownButton | EditorDivider;

export interface EditorRibbonButton extends Omit<EditorCommand, 'type' | 'description' | 'keywords'> {
    type?: 'ribbonButton';
    tooltip?: EditorRibbonTooltip;
}

export interface EditorRibbonDropdownButton extends Omit<EditorRibbonButton, 'type' | 'perform'> {
    type: 'ribbonDropdownButton';
    options: EditorRibbonDropdownButtonItem[];
}

export type EditorRibbonDropdownButtonItem = EditorRibbonDropdownButtonOption | EditorDivider;

export interface EditorRibbonDropdownButtonOption extends Omit<EditorCommand, 'type'> {
    type?: 'ribbonDropdownOption';
    label: ReactNode;
}

export interface EditorRibbonTooltip {
    children: ReactNode;
    placement?: TooltipProps['placement'];
}
