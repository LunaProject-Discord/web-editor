'use client';

import { borderAndBoxShadow, generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import { Box, BoxProps, styled } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { EditorRibbonGroup } from '../../../interfaces';
import {
    EditorComponentProps,
    RibbonAccessKeyTip,
    RibbonButton,
    RibbonDropdownButton,
    RibbonGroupDivider,
    useCurrentEditor
} from '../../index';

export const ribbonGroupClasses = generateComponentClasses(
    'RibbonGroup',
    [
        'root',
        'content',
        'label'
    ]
);

export const RibbonGroupRoot = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(ribbonGroupClasses.root, className)}
            {...props}
        />
    )
)({
    position: 'relative',
    [`&:hover .${ribbonGroupClasses.label}`]: {
        display: 'block'
    }
});

export const RibbonGroupContent = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(ribbonGroupClasses.content, className)}
            {...props}
        />
    )
)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(.5)
}));

export const RibbonGroupLabel = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(ribbonGroupClasses.label, className)}
            {...props}
        />
    )
)(({ theme }) => ({
    padding: theme.spacing(0, .5),
    position: 'absolute',
    bottom: theme.spacing(-2),
    left: '50%',
    display: 'none',
    fontSize: theme.typography.body2.fontSize,
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    zIndex: 1,
    transform: 'translateX(-50%)',
    color: (theme.vars || theme).palette.text.secondary,
    backgroundColor: (theme.vars || theme).palette.background.paper,
    borderRadius: theme.spacing(.5),
    ...borderAndBoxShadow(theme)
}));

export interface RibbonGroupProps extends EditorComponentProps, Omit<EditorRibbonGroup, 'type'> {
    tabName: string;
}

export const RibbonGroup = ({ tabName, name, label, accessKey, content, editor: _editor }: RibbonGroupProps) => {
    const editor = useCurrentEditor(_editor);
    if (!editor)
        return null;

    return (
        <RibbonAccessKeyTip accessKey={accessKey} target="tab" name={tabName}>
            <RibbonGroupRoot>
                {label && <RibbonGroupLabel>{label}</RibbonGroupLabel>}
                <RibbonGroupContent>
                    {content.map((item, index) => {
                        switch (item.type) {
                            case 'divider':
                                return (<RibbonGroupDivider />);

                            case 'ribbonDropdownButton':
                                return (<RibbonDropdownButton groupName={name} {...item} editor={_editor} />);

                            case 'ribbonButton':
                            default:
                                return (<RibbonButton groupName={name} {...item} editor={_editor} />);
                        }
                    })}
                </RibbonGroupContent>
            </RibbonGroupRoot>
        </RibbonAccessKeyTip>
    );
};
