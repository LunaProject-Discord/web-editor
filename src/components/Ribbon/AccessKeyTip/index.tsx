'use client';

import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import { alpha, Box, BoxProps, styled } from '@mui/material';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { EditorRibbonAccessKey } from '../../../interfaces';
import { useRibbonAccessKeyContext } from '../Context';

export const ribbonAccessKeyTipClasses = generateComponentClasses(
    'RibbonAccessKeyTip',
    [
        'root',
        'content',
        'label'
    ]
);

export const RibbonAccessKeyTipRoot = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(ribbonAccessKeyTipClasses.root, className)}
            {...props}
        />
    )
)(({
    position: 'relative'
}));

export const RibbonAccessKeyTipContent = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(ribbonAccessKeyTipClasses.content, className)}
            {...props}
        />
    )
)(({
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center'
}));

export const RibbonAccessKeyTipLabel = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(ribbonAccessKeyTipClasses.label, className)}
            {...props}
        />
    )
)(({ theme }) => ({
    height: theme.spacing(2.5),
    margin: 'auto 0',
    padding: theme.spacing(0, .5),
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    fontSize: theme.typography.body2.fontSize,
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    zIndex: 1,
    transform: 'translateX(-50%)',
    color: (theme.vars || theme).palette.common.white,
    backgroundColor: theme.vars ? theme.vars.palette.Tooltip.bg : alpha(theme.palette.grey[700], .92),
    borderRadius: (theme.vars || theme).shape.borderRadius
}));

export interface RibbonAccessKeyTipProps {
    accessKey: EditorRibbonAccessKey | undefined;
    name?: string;
    children?: ReactNode;
}

export const RibbonAccessKeyTip = ({ accessKey, name, children }: RibbonAccessKeyTipProps) => {
    const value = useRibbonAccessKeyContext();

    if (!accessKey || !value || ((name && value.tabName !== name) || (!name && value.tabName)) || value.input && !accessKey.toLowerCase().startsWith(value.input))
        return children;

    return (
        <RibbonAccessKeyTipRoot>
            <RibbonAccessKeyTipContent>{children}</RibbonAccessKeyTipContent>
            <RibbonAccessKeyTipLabel>{accessKey}</RibbonAccessKeyTipLabel>
        </RibbonAccessKeyTipRoot>
    );
};
