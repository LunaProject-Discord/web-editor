'use client';

import { Tooltip, TooltipProps } from '@mui/material';
import React, { useContext } from 'react';
import { EditorRibbonKeyTipTargetType } from '../../../interfaces';
import { RibbonKeyTipTargetContext } from '../Context';

export interface RibbonKeyTipProps extends Omit<TooltipProps, 'title' | 'open' | 'target' | 'name'> {
    keytip: string | undefined;
    target: EditorRibbonKeyTipTargetType;
    name?: string;
}

export const RibbonKeyTip = ({ keytip, target, name, children, ...props }: RibbonKeyTipProps) => {
    const targetState = useContext(RibbonKeyTipTargetContext);

    console.log(keytip, target, name, targetState);

    if (!keytip || !targetState || targetState.type !== target)
        return children;

    return (
        <Tooltip
            title={keytip.toUpperCase()}
            open={targetState.tabName === name || targetState.groupName === name}
            placement="bottom"
            {...props}
        >
            {children}
        </Tooltip>
    );
};
