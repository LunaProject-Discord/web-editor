'use client';

import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { EditorRibbonButton, EditorRibbonGroup, EditorRibbonKeyTipTarget, EditorRibbonTab } from '../../../interfaces';
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
            if (!editor)
                return;

            switch (e.key) {
                case 'Escape':
                    if (!target)
                        return;

                    setTarget(undefined);
                    return;

                case 'Alt':
                    if (target)
                        return;

                    setTarget({ type: 'ribbon' });
                    return;

                default:
                    if (!target)
                        return;

                    if (target.type === 'ribbon') {
                        const tab = tabs.find((tab) => tab.keytip === e.key);
                        if (!tab) {
                            setTarget(undefined);
                            return;
                        }

                        setTarget({ type: 'tab', tabName: tab.name });
                        return;
                    } else if (target.type === 'tab') {
                        const tab = tabs.find((tab) => tab.name === target.tabName);
                        const group = tab?.content.find((tabItem): tabItem is EditorRibbonGroup => tabItem.type === 'ribbonGroup' && tabItem.keytip === e.key);
                        if (!tab || !group) {
                            setTarget(undefined);
                            return;
                        }

                        setTarget({ type: 'group', tabName: tab.name, groupName: group.name });
                        return;
                    } else if (target.type === 'group') {
                        const tab = tabs.find((tab) => tab.name === target.tabName);
                        const group = tab?.content.find((tabItem): tabItem is EditorRibbonGroup => tabItem.type === 'ribbonGroup' && tabItem.name === target.groupName);
                        const item = group?.content.find((groupItem) => 'keytip' in groupItem && groupItem.keytip === e.key);

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

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [editor, tabs, target]);

    return (
        <RibbonKeyTipTargetContext.Provider value={target}>
            {children}
        </RibbonKeyTipTargetContext.Provider>
    );
};
