'use client';

import { Tab, Tabs } from '@mui/material';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import {
    EditorComponentProps,
    getEditorPredicate,
    RibbonAccessKeyTip,
    ribbonTabClasses,
    useCurrentEditor,
    useRibbonTabContext
} from '../../../';

export type RibbonTabsProps = EditorComponentProps;

export const RibbonTabs = ({ editor: _editor }: RibbonTabsProps) => {
    const { open, name, tabs, updateTab } = useRibbonTabContext();

    const handleTabClick = useCallback((name: string) => () => updateTab(name), [updateTab]);

    const editor = useCurrentEditor(_editor);
    if (!editor)
        return null;

    return (
        <Tabs
            value={open ? name : false}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ border: 'none' }}
        >
            {tabs.map((tab) => {
                const isVisible = getEditorPredicate(tab.visible, editor, true);
                if (!isVisible)
                    return null;

                return (
                    <Tab
                        key={tab.name}
                        value={tab.name}
                        onClick={handleTabClick(tab.name)}
                        label={
                            <RibbonAccessKeyTip accessKey={tab.accessKey} target="ribbon">
                                {tab.label}
                            </RibbonAccessKeyTip>
                        }
                        className={
                            clsx(
                                ribbonTabClasses.root,
                                open && name === tab.name && ribbonTabClasses.active
                            )
                        }
                    />
                );
            })}
        </Tabs>
    );
};
