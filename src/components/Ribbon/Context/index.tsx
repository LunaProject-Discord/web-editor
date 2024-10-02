'use client';

import React, { createContext, ReactNode, useEffect, useState } from 'react';
import {
    EditorDivider,
    EditorRibbonButton,
    EditorRibbonGroup,
    EditorRibbonGroupItem,
    EditorRibbonKeyTipTarget,
    EditorRibbonTab
} from '../../../interfaces';
import { EditorComponentProps, useCurrentEditor } from '../../index';

export const RibbonKeyTipTargetContext = createContext<EditorRibbonKeyTipTarget | undefined>(undefined);

export interface RibbonProviderProps extends EditorComponentProps {
    tabs: EditorRibbonTab[];
    children: ReactNode;
}

export const RibbonProvider = ({ editor: _editor, tabs, children }: RibbonProviderProps) => {
    const editor = useCurrentEditor(_editor);

    const [target, setTarget] = useState<EditorRibbonKeyTipTarget | undefined>(undefined);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!editor || e.isComposing)
                return;

            const keyLowerCased = e.key.toLowerCase();
            switch (e.key) {
                case 'Escape':
                    return;

                case 'Alt':
                    if (target)
                        return;

                    e.preventDefault();
                    setTarget({ type: 'ribbon' });
                    return;

                default:
                    if (!target)
                        return;

                    e.preventDefault();
                    if (target.type === 'ribbon') {
                        const tab = tabs.find((tab) => tab.keytip?.toLowerCase() === keyLowerCased);
                        if (!tab) {
                            setTarget(undefined);
                            return;
                        }

                        setTarget({ type: 'tab', tabName: tab.name });
                        return;
                    } else if (target.type === 'tab') {
                        const tab = tabs.find((tab) => tab.name === target.tabName);
                        const group = tab?.content.find((tabItem): tabItem is EditorRibbonGroup => (!tabItem.type || tabItem.type === 'ribbonGroup') && tabItem.keytip?.toLowerCase() === keyLowerCased);

                        console.log(target, tab, group);

                        if (!tab || !group) {
                            setTarget(undefined);
                            return;
                        }

                        setTarget({ type: 'group', tabName: tab.name, groupName: group.name });
                        return;
                    } else if (target.type === 'group') {
                        const tab = tabs.find((tab) => tab.name === target.tabName);
                        const group = tab?.content.find((tabItem): tabItem is EditorRibbonGroup => (!tabItem.type || tabItem.type === 'ribbonGroup') && tabItem.name === target.groupName);
                        const item = group?.content.find((groupItem): groupItem is Exclude<EditorRibbonGroupItem, EditorDivider> => {
                            if (groupItem.type === 'divider')
                                return false;

                            return groupItem.keytip?.toLowerCase() === keyLowerCased;
                        });

                        console.log(target, tab, group, item);

                        setTarget(undefined);
                        if (!tab || !group || !item)
                            return;

                        switch (item.type) {
                            case 'ribbonDropdownButton':
                                return;

                            case 'ribbonButton':
                            default:
                                const button = item as EditorRibbonButton;
                                button.perform({
                                    editor,
                                    view: editor.view,
                                    state: editor.state
                                });
                                return;
                        }
                    }

                    return;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (!editor || e.isComposing || e.key !== 'Escape' || !target)
                return;

            e.preventDefault();
            setTarget(undefined);
            return;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [editor, tabs, target]);

    return (
        <RibbonKeyTipTargetContext.Provider value={target}>
            {children}
        </RibbonKeyTipTargetContext.Provider>
    );
};
