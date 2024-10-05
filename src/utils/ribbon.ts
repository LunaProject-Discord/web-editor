import deepmerge from 'deepmerge';
import {
    EditorCommand,
    EditorRibbonButton,
    EditorRibbonDropdownButton,
    EditorRibbonDropdownButtonOption
} from '../interfaces';

export const asRibbonButton = (
    command: EditorCommand | EditorRibbonButton,
    button: Partial<EditorRibbonButton> = {}
) => deepmerge<EditorRibbonButton>(
    {
        type: 'ribbonButton',
        name: command.name,
        icon: command.icon,
        label: command.label,
        accessKey: command.type === 'ribbonButton' ? command.accessKey : undefined,
        tooltip: command.type === 'ribbonButton' ? command.tooltip : undefined,
        disabled: command.disabled,
        selected: command.selected,
        perform: command.perform
    },
    button
);

export const asRibbonDropdownButton = (
    command: EditorCommand | EditorRibbonDropdownButton,
    options: EditorRibbonDropdownButtonOption[],
    button: Partial<EditorRibbonDropdownButton> = {}
) => deepmerge<EditorRibbonDropdownButton>(
    {
        type: 'ribbonDropdownButton',
        name: command.name,
        icon: command.icon,
        label: command.label,
        description: command.description,
        accessKey: command.type === 'ribbonDropdownButton' ? command.accessKey : undefined,
        tooltip: command.type === 'ribbonDropdownButton' ? command.tooltip : undefined,
        disabled: command.disabled,
        selected: command.selected,
        options
    },
    button
);

export const asRibbonDropdownButtonOption = (
    command: EditorCommand | EditorRibbonDropdownButtonOption,
    option: Partial<EditorRibbonDropdownButtonOption> = {}
) => deepmerge<EditorRibbonDropdownButtonOption>(
    {
        type: 'ribbonDropdownOption',
        name: command.name,
        icon: command.icon,
        label: command.label,
        description: command.description,
        disabled: command.disabled,
        selected: command.selected,
        perform: command.perform
    },
    option
);
