import deepmerge from 'deepmerge';
import { EditorCommand, EditorRibbonButton } from '../interfaces';

export const asRibbonButton = (
    command: EditorCommand,
    button: Partial<EditorRibbonButton>
) => deepmerge<EditorRibbonButton>(
    {
        type: 'ribbonButton',
        name: command.name,
        icon: command.icon,
        label: command.label,
        enabled: command.enabled,
        selected: command.selected,
        perform: command.perform
    },
    button
);
