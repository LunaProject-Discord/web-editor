'use client';

import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import { alpha, Box, BoxProps, styled } from '@mui/material';
import clsx from 'clsx';
import React, { forwardRef, ReactNode } from 'react';
import { EditorRibbonAccessKey } from '../../../interfaces';
import { RibbonAccessKeyTargetType, useRibbonAccessKeyContext } from '../Context';

export const ribbonAccessKeyTipClasses = generateComponentClasses(
    'RibbonAccessKeyTip',
    [
        'root',
        'content',
        'label'
    ]
);

export const RibbonAccessKeyTipRoot = styled(
    // eslint-disable-next-line react/display-name
    forwardRef<HTMLDivElement, BoxProps>((
        {
            className,
            ...props
        },
        ref
    ) => (
        <Box
            ref={ref}
            className={clsx(ribbonAccessKeyTipClasses.root, className)}
            {...props}
        />
    ))
)(({
    position: 'relative'
}));

export const RibbonAccessKeyTipContent = styled(
    // eslint-disable-next-line react/display-name
    forwardRef<HTMLDivElement, BoxProps>((
        {
            className,
            ...props
        },
        ref
    ) => (
        <Box
            ref={ref}
            className={clsx(ribbonAccessKeyTipClasses.content, className)}
            {...props}
        />
    ))
)(({
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center'
}));

export const RibbonAccessKeyTipLabel = styled(
    // eslint-disable-next-line react/display-name
    forwardRef<HTMLDivElement, BoxProps>((
        {
            className,
            ...props
        },
        ref
    ) => (
        <Box
            ref={ref}
            className={clsx(ribbonAccessKeyTipClasses.label, className)}
            {...props}
        />
    ))
)(({ theme }) => ({
    padding: theme.spacing(0, .5),
    position: 'absolute',
    bottom: theme.spacing(-2),
    left: '50%',
    fontSize: theme.typography.body2.fontSize,
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    zIndex: 1,
    transform: 'translateX(-50%)',
    color: (theme.vars || theme).palette.common.white,
    backgroundColor: theme.vars ? theme.vars.palette.Tooltip.bg : alpha(theme.palette.grey[700], .92),
    borderRadius: theme.spacing(.5)
}));

export interface RibbonAccessKeyTipProps {
    accessKey: EditorRibbonAccessKey | undefined;
    target: RibbonAccessKeyTargetType;
    name?: string;
    children: ReactNode;
}

export const RibbonAccessKeyTip = forwardRef<HTMLDivElement, RibbonAccessKeyTipProps>((
    {
        accessKey,
        target,
        name,
        children
    },
    ref
) => {
    const value = useRibbonAccessKeyContext();

    if (!accessKey || !value || value.type !== target || (value.tabName !== name && value.groupName !== name) || value.input && !accessKey.toLowerCase().startsWith(value.input)) {
        return (
            <RibbonAccessKeyTipContent ref={ref}>
                {children}
            </RibbonAccessKeyTipContent>
        );
    }

    return (
        <RibbonAccessKeyTipRoot ref={ref}>
            <RibbonAccessKeyTipContent>{children}</RibbonAccessKeyTipContent>
            <RibbonAccessKeyTipLabel>{accessKey}</RibbonAccessKeyTipLabel>
        </RibbonAccessKeyTipRoot>
    );
});
RibbonAccessKeyTip.displayName = 'RibbonAccessKeyTip';
