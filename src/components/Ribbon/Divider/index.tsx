'use client';

import { Divider, DividerProps } from '@mui/material';
import React from 'react';

export const RibbonDivider = ({ orientation, flexItem, sx }: DividerProps) => (
    <Divider
        orientation={orientation ?? 'vertical'}
        flexItem={flexItem ?? true}
        sx={{ my: 1.25, ...sx }}
    />
);
