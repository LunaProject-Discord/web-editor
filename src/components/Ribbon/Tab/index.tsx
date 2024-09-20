'use client';

import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import { Box, BoxProps, styled } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { EditorRibbonTab } from '../../../interfaces';
import { getEditorPredicate } from '../../../utils';
import { EditorComponentProps, RibbonGroup, useCurrentEditor } from '../../index';
import { RibbonGroupDivider } from '../GroupDivider';

export const ribbonTabClasses = generateComponentClasses(
    'RibbonTab',
    [
        'root'
    ]
);

export const RibbonTabRoot = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(ribbonTabClasses.root, className)}
            {...props}
        />
    )
)(({ theme }) => ({
    minHeight: theme.spacing(6),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2)
}));

export type RibbonTabProps = EditorComponentProps & Pick<EditorRibbonTab, 'label' | 'visible' | 'content'>;

export const RibbonTab = ({ label, visible, content, editor: _editor }: RibbonTabProps) => {
    const editor = useCurrentEditor(_editor);
    if (!editor)
        return null;

    const isVisible = getEditorPredicate(visible, editor, true);
    if (!isVisible)
        return null;

    return (
        <RibbonTabRoot>
            {content.map((item, index) => {
                switch (item.type) {
                    case 'divider':
                        return (<RibbonGroupDivider />);

                    case 'ribbonGroup':
                    default:
                        return (<RibbonGroup {...item} editor={_editor} />);
                }
            })}
        </RibbonTabRoot>
    );
};
