import { TooltipProps } from '@mui/material';
import { ReactNode } from 'react';
import { EditorCommand, EditorDivider, EditorPredicate } from './index';

export interface EditorRibbonTab {
    type?: 'ribbonTab';
    name: string;
    label: ReactNode;
    keytip?: string;
    visible?: EditorPredicate;
    content: EditorRibbonTabItem[];
}

export type EditorRibbonTabItem = EditorRibbonGroup | EditorDivider;

export interface EditorRibbonGroup {
    type?: 'ribbonGroup';
    name: string;
    label?: ReactNode;
    keytip?: string;
    content: EditorRibbonGroupItem[];
}

export type EditorRibbonGroupItem = EditorRibbonButton | EditorRibbonDropdownButton | EditorDivider;

export interface EditorRibbonButton extends Omit<EditorCommand, 'type' | 'description' | 'keywords'> {
    type?: 'ribbonButton';
    keytip?: string;
    tooltip?: EditorRibbonTooltip;
}

export interface EditorRibbonDropdownButton extends Omit<EditorCommand, 'type' | 'keywords' | 'perform'> {
    type: 'ribbonDropdownButton';
    keytip?: string;
    tooltip?: EditorRibbonTooltip;
    options: EditorRibbonDropdownButtonItem[];
}

export type EditorRibbonDropdownButtonItem = EditorRibbonDropdownButtonOption | EditorDivider;

export interface EditorRibbonDropdownButtonOption extends Omit<EditorCommand, 'type' | 'keywords'> {
    type?: 'ribbonDropdownOption';
    label: ReactNode;
    keytip?: string;
}


export type EditorRibbonKeyTipTargetType = 'ribbon' | 'tab' | 'group';

export interface EditorRibbonKeyTipTarget {
    type: EditorRibbonKeyTipTargetType;
    tabName?: string;
    groupName?: string;
}

export interface EditorRibbonTooltip {
    children: ReactNode;
    placement?: TooltipProps['placement'];
}
