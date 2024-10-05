'use client';

import React, { ReactNode } from 'react';
import { EditorComponentProps, EditorRibbonTab, RibbonAccessKeyProvider, RibbonTabProvider } from '../../../';

export interface RibbonProviderProps extends EditorComponentProps {
    tabs: EditorRibbonTab[];
    children: ReactNode;
}

export const RibbonProvider = ({ editor: _editor, tabs, children }: RibbonProviderProps) => {
    return (
        <RibbonTabProvider editor={_editor} tabs={tabs}>
            <RibbonAccessKeyProvider editor={_editor}>
                {children}
            </RibbonAccessKeyProvider>
        </RibbonTabProvider>
    );
};

export * from './access_key';
export * from './tab';
