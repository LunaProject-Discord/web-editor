'use client';

import React from 'react';
import { EditorComponentProps, RibbonTabContent, useRibbonTabContext } from '../../';

export type RibbonTabPanelProps = EditorComponentProps;

export const RibbonTabPanel = ({ editor }: RibbonTabPanelProps) => {
    const { tab } = useRibbonTabContext();
    if (!tab)
        return null;

    return (<RibbonTabContent editor={editor} name={tab.name} visible={tab.visible} content={tab.content} />);
};
