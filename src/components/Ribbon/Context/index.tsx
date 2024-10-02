'use client';

import React, { ReactNode } from 'react';
import { EditorRibbonTab } from '../../../interfaces';
import { EditorComponentProps } from '../../index';
import { RibbonAccessKeyProvider } from './access_key';
import { RibbonTabProvider } from './tab';

export interface RibbonProviderProps extends EditorComponentProps {
    tabs: EditorRibbonTab[];
    children: ReactNode;
}

export const RibbonProvider = ({ editor: _editor, tabs, children }: RibbonProviderProps) => {
    return (
        <RibbonTabProvider editor={_editor} tabs={tabs}>
            <RibbonAccessKeyProvider editor={_editor} tabs={tabs}>
                {children}
            </RibbonAccessKeyProvider>
        </RibbonTabProvider>
    );
};

export * from './access_key';
export * from './tab';
