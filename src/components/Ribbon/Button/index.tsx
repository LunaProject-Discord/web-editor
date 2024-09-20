'use client';

import { ButtonBase } from '@lunaproject/web-core/dist/components/ButtonBase';
import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import { alpha, ButtonBaseProps, styled, Tooltip } from '@mui/material';
import clsx from 'clsx';
import React, { forwardRef, useCallback } from 'react';
import { EditorRibbonButton } from '../../../interfaces';
import { getEditorPredicate } from '../../../utils';
import { EditorComponentProps, useCurrentEditor } from '../../index';

export const ribbonButtonClasses = generateComponentClasses(
    'RibbonButton',
    [
        'root',

        'selected'
    ]
);

export interface RibbonButtonRootProps extends ButtonBaseProps {
    selected?: boolean;
}

export const RibbonButtonRoot = styled(
    // eslint-disable-next-line react/display-name
    forwardRef<HTMLButtonElement, RibbonButtonRootProps>(({ selected, className, ...props }, ref) => (
        <ButtonBase
            ref={ref}
            className={
                clsx(
                    ribbonButtonClasses.root,
                    selected && ribbonButtonClasses.selected,
                    className
                )
            }
            {...props}
        />
    )),
    { shouldForwardProp: (prop) => prop !== 'selected' }
)<RibbonButtonRootProps>(({ theme }) => ({
    padding: theme.spacing(1),
    gap: theme.spacing(1),
    color: (theme.vars || theme).palette.action.active,
    [`&.${ribbonButtonClasses.selected}`]: {
        color: (theme.vars || theme).palette.text.primary,
        backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.selectedOpacity})`
            : alpha(theme.palette.text.primary, theme.palette.action.selectedOpacity),
        '&:hover': {
            backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.text.primaryChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))`
                : alpha(theme.palette.text.primary, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
            '@media (hover: none)': {
                backgroundColor: theme.vars
                    ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.selectedOpacity})`
                    : alpha(theme.palette.text.primary, theme.palette.action.selectedOpacity)
            }
        }
    }
}));


export type RibbonButtonProps = EditorComponentProps & Omit<EditorRibbonButton, 'type' | 'name'>;

export const RibbonButton = (
    {
        icon: Icon,
        label,
        tooltip,
        enabled,
        selected,
        perform,
        editor: _editor
    }: RibbonButtonProps
) => {
    const editor = useCurrentEditor(_editor);
    if (!editor)
        return null;

    const isDisabled = !getEditorPredicate(enabled, editor, true);
    const isSelected = getEditorPredicate(selected, editor);

    const handleButtonClick = useCallback(() => perform({
        editor,
        view: editor.view,
        state: editor.state
    }), [editor, perform]);

    const children = (
        <RibbonButtonRoot onClick={handleButtonClick} disabled={isDisabled} selected={isSelected}>
            {Icon && <Icon />}
            {label}
        </RibbonButtonRoot>
    );

    if (!tooltip)
        return children;

    return (
        <Tooltip title={tooltip.children} placement={tooltip.placement}>
            {children}
        </Tooltip>
    );
};
