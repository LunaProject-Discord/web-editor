'use client';

import { Divider, DividerProps } from '@mui/material';
import React from 'react';

export const RibbonGroupDivider = ({ orientation, flexItem, sx }: DividerProps) => (
    <Divider
        orientation={orientation ?? 'vertical'}
        flexItem={flexItem ?? true}
        sx={{ m: 1, ...sx }}
    />
);
