'use client';

import { Tabs, TabsActions } from '@mui/material';
import React, { useCallback } from 'react';
import { EditorComponentProps, RibbonTab, useCurrentEditor, useRibbonTabContext } from '../../../';

export type RibbonTabsProps = EditorComponentProps;

export const RibbonTabs = ({ editor: _editor }: RibbonTabsProps) => {
    const { open, name, tabs } = useRibbonTabContext();

    const handleRef = useCallback((actions: TabsActions | null) => {
        if (!actions || !open)
            return;

        actions.updateIndicator();
    }, [open]);

    const editor = useCurrentEditor(_editor);
    if (!editor)
        return null;

    console.log('[Tabs]', open, name, tabs);

    return (
        <Tabs
            value={open ? name : undefined}
            action={handleRef}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ border: 'none' }}
        >
            {tabs.map((tab) => (
                <RibbonTab
                    key={tab.name}
                    editor={_editor}
                    name={tab.name}
                    label={tab.label}
                    accessKey={tab.accessKey}
                    visible={tab.visible}
                />
            ))}
        </Tabs>
    );
};
