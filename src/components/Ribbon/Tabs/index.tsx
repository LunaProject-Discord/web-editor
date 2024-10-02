'use client';

import { Tabs } from '@mui/material';
import React from 'react';
import { EditorComponentProps, RibbonTab, useRibbonTabContext } from '../../../';

export type RibbonTabsProps = EditorComponentProps;

export const RibbonTabs = ({ editor }: RibbonTabsProps) => {
    const { open, name, tabs } = useRibbonTabContext();

    return (
        <Tabs value={open ? name : undefined} variant="scrollable" scrollButtons="auto" sx={{ border: 'none' }}>
            {tabs.map((tab) => (
                <RibbonTab
                    key={tab.name}
                    editor={editor}
                    name={tab.name}
                    label={tab.label}
                    accessKey={tab.accessKey}
                    visible={tab.visible}
                />
            ))}
        </Tabs>
    );
};
