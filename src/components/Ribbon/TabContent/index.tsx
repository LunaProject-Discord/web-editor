'use client';

import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import { Box, BoxProps, styled } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { EditorRibbonTab } from '../../../interfaces';
import { getEditorPredicate } from '../../../utils';
import { EditorComponentProps, RibbonDivider, RibbonGroup, useCurrentEditor } from '../../index';

export const ribbonTabContentClasses = generateComponentClasses(
    'RibbonTabContent',
    [
        'root'
    ]
);

export const RibbonTabContentRoot = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(ribbonTabContentClasses.root, className)}
            {...props}
        />
    )
)(({ theme }) => ({
    minHeight: theme.spacing(6),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2)
}));

export type RibbonTabContentProps = EditorComponentProps & Omit<EditorRibbonTab, 'type' | 'accessKey'>;

export const RibbonTabContent = ({ name, label, visible, content, editor: _editor }: RibbonTabContentProps) => {
    const editor = useCurrentEditor(_editor);
    if (!editor)
        return null;

    const isVisible = getEditorPredicate(visible, editor, true);
    if (!isVisible)
        return null;

    return (
        <RibbonTabContentRoot>
            {content.map((item, index) => {
                switch (item.type) {
                    case 'divider':
                        return (<RibbonDivider />);

                    case 'ribbonGroup':
                    default:
                        return (<RibbonGroup tabName={name} {...item} editor={_editor} />);
                }
            })}
        </RibbonTabContentRoot>
    );
};
