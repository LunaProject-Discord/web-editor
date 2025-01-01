'use client';

import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import { Box, BoxProps, styled } from '@mui/material';
import clsx from 'clsx';
import React from 'react';

export const ribbonTabHeaderClasses = generateComponentClasses(
    'RibbonTabHeader',
    [
        'root'
    ]
);

export const RibbonTabHeader = styled(
    ({ className, ...props }: BoxProps) => (
        <Box
            className={clsx(ribbonTabHeaderClasses.root, className)}
            {...props}
        />
    )
)(({ theme }) => ({
    minHeight: theme.spacing(6),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2)
}));
