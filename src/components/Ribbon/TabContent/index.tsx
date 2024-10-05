'use client';

import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import { Box, BoxProps, styled } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import {
    EditorComponentProps,
    EditorRibbonTab,
    getEditorPredicate,
    RibbonDivider,
    RibbonGroup,
    useCurrentEditor
} from '../../../';

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

export type RibbonTabContentProps = EditorComponentProps & Pick<EditorRibbonTab, 'name' | 'visible' | 'content'>;

export const RibbonTabContent = ({ editor: _editor, name, visible, content }: RibbonTabContentProps) => {
    const editor = useCurrentEditor(_editor);
    if (!editor)
        return null;

    const isVisible = getEditorPredicate(visible, editor, true);
    if (!isVisible)
        return null;

    return (
        <RibbonTabContentRoot>
            {content.map((item, i) => {
                switch (item.type) {
                    case 'divider':
                        return (<RibbonDivider key={`divider-${i}`} />);

                    case 'ribbonGroup':
                    default:
                        return (<RibbonGroup key={item.name} tabName={name} {...item} editor={_editor} />);
                }
            })}
        </RibbonTabContentRoot>
    );
};
