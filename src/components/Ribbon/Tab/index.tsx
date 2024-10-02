'use client';

import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import { Tab } from '@mui/material';
import clsx from 'clsx';
import React, { useCallback, useContext } from 'react';
import { EditorRibbonTab } from '../../../interfaces';
import { getEditorPredicate } from '../../../utils';
import { EditorComponentProps, RibbonAccessKeyTip, RibbonTabContext, useCurrentEditor } from '../../index';

export const ribbonTabClasses = generateComponentClasses(
    'RibbonTab',
    [
        'root',

        'context',
        'active'
    ]
);

export type RibbonTabProps = EditorComponentProps & Omit<EditorRibbonTab, 'type' | 'content'>;

export const RibbonTab = ({ editor: _editor, name, label, visible, accessKey }: RibbonTabProps) => {
    const { open, name: tabName, updateTab } = useContext(RibbonTabContext);

    const handleTabClick = useCallback(() => updateTab(name), [name, updateTab]);

    const editor = useCurrentEditor(_editor);
    if (!editor)
        return null;

    const isVisible = getEditorPredicate(visible, editor, true);
    if (!isVisible)
        return null;

    return (
        <Tab
            value={name}
            onClick={handleTabClick}
            label={
                <RibbonAccessKeyTip key={accessKey} target="ribbon">
                    {label}
                </RibbonAccessKeyTip>
            }
            className={clsx(ribbonTabClasses.root, open && tabName === name && ribbonTabClasses.active)}
        />
    );
};
