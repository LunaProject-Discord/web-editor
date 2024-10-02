'use client';

import { borderAndBoxShadow, generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import { Box, BoxProps, styled, TooltipProps } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { EditorRibbonKeyTipTargetType } from '../../../interfaces';
import { RibbonKeyTipTargetContext } from '../Context';

export const ribbonKeyTipClasses = generateComponentClasses(
    'RibbonKeyTip',
    [
        'root',
        'label'
    ]
);

export const RibbonKeyTipRoot = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(ribbonKeyTipClasses.root, className)}
            {...props}
        />
    )
)(({ theme }) => ({
    position: 'relative'
}));

export const RibbonKeyTipLabel = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(ribbonKeyTipClasses.label, className)}
            {...props}
        />
    )
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
    color: (theme.vars || theme).palette.text.secondary,
    backgroundColor: (theme.vars || theme).palette.background.paper,
    borderRadius: theme.spacing(.5),
    ...borderAndBoxShadow(theme)
}));

export interface RibbonKeyTipProps extends Omit<TooltipProps, 'title' | 'open' | 'target' | 'name'> {
    keytip: string | undefined;
    target: EditorRibbonKeyTipTargetType;
    name?: string;
}

export const RibbonKeyTip = ({ keytip, target, name, children, ...props }: RibbonKeyTipProps) => {
    const targetState = useContext(RibbonKeyTipTargetContext);

    if (!keytip || !targetState || targetState.type !== target || (targetState.tabName !== name && targetState.groupName !== name))
        return children;

    return (
        <RibbonKeyTipRoot>
            {children}
            <RibbonKeyTipLabel>
                {keytip.toUpperCase()}
            </RibbonKeyTipLabel>
        </RibbonKeyTipRoot>
    );
};
