'use client';

import { Menu } from '@lunaproject/web-core/dist/components/Menu';
import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import { Box, Divider, ListItemIcon, ListItemText, MenuItem, Tooltip } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { EditorRibbonDropdownButton } from '../../../interfaces';
import { getEditorPredicate } from '../../../utils';
import { EditorComponentProps, RibbonButtonRoot, RibbonKeyTip, useCurrentEditor } from '../../index';

export const ribbonDropdownButtonClasses = generateComponentClasses(
    'RibbonDropdownButton',
    [
        'root',
        'dropdown'
    ]
);


export interface RibbonDropdownButtonProps extends EditorComponentProps, Omit<EditorRibbonDropdownButton, 'type' | 'name'> {
    groupName: string;
}

export const RibbonDropdownButton = (
    {
        groupName,
        icon: Icon,
        label,
        keytip,
        tooltip,
        disabled,
        selected,
        options,
        editor: _editor
    }: RibbonDropdownButtonProps
) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | undefined>(undefined);

    const editor = useCurrentEditor(_editor);
    if (!editor)
        return null;

    const isDisabled = getEditorPredicate(disabled, editor);
    const isSelected = getEditorPredicate(selected, editor);

    const buttonChildren = (
        <RibbonKeyTip keytip={keytip} target="group" name={groupName}>
            <RibbonButtonRoot
                onClick={(e) => setAnchorEl(e.currentTarget)}
                disabled={isDisabled}
                selected={isSelected}
                className={ribbonDropdownButtonClasses.root}
            >
                {Icon && <Icon />}
                {label}
            </RibbonButtonRoot>
        </RibbonKeyTip>
    );

    const children = tooltip ? (
        <Tooltip title={tooltip.children} placement={tooltip.placement}>
            {buttonChildren}
        </Tooltip>
    ) : buttonChildren;

    return (
        <Fragment>
            {children}
            <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(undefined)}
                disablePortal
                className={ribbonDropdownButtonClasses.dropdown}
            >
                {options.map((option, index) => {
                    switch (option.type) {
                        case 'divider':
                            return (<Divider />);

                        case 'ribbonDropdownOption':
                        default:
                            const isOptionDisabled = getEditorPredicate(option.disabled, editor);
                            const isOptionSelected = getEditorPredicate(option.selected, editor);

                            const handleOptionClick = () => {
                                setAnchorEl(undefined);
                                option.perform({
                                    editor,
                                    view: editor.view,
                                    state: editor.state
                                });
                            };

                            const OptionIcon = option.icon;
                            return (
                                <MenuItem
                                    key={option.name}
                                    onClick={handleOptionClick}
                                    disabled={isOptionDisabled}
                                    selected={isOptionSelected}
                                >
                                    <ListItemIcon>{OptionIcon && <OptionIcon />}</ListItemIcon>
                                    <ListItemText
                                        primary={option.label}
                                        secondary={option.description}
                                    />
                                </MenuItem>
                            );
                    }
                })}
            </Menu>
        </Fragment>
    );
};
