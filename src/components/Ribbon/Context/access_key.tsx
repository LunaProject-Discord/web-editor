'use client';

import { SomeRequired } from '@lunaproject/web-core/dist/utils';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import {
    EditorComponentProps,
    EditorDivider,
    EditorRibbonGroup,
    EditorRibbonGroupItem,
    EditorRibbonTab,
    useCurrentEditor,
    useRibbonTabContext
} from '../../../';

export type RibbonAccessKeyTargetType = 'ribbon' | 'tab' | 'group';

export interface RibbonAccessKeyTarget {
    /**
     * 表示するターゲットの種類
     */
    type: RibbonAccessKeyTargetType;
    /**
     * 選択されているタブの名前
     */
    tabName?: string;
    /**
     * 選択されているグループの名前
     */
    groupName?: string;
    /**
     * 入力済みのキー
     */
    input?: string;
}


export const RibbonAccessKeyContext = createContext<RibbonAccessKeyTarget | undefined>(undefined);

export const useRibbonAccessKeyContext = () => useContext(RibbonAccessKeyContext);

export interface RibbonAccessKeyProviderProps extends EditorComponentProps {
    children: ReactNode;
}

export const RibbonAccessKeyProvider = ({ editor: _editor, children }: RibbonAccessKeyProviderProps) => {
    const editor = useCurrentEditor(_editor);

    const { setOpen, setName, tabs } = useRibbonTabContext();

    const [value, setValue] = useState<RibbonAccessKeyTarget | undefined>(undefined);

    const getKey = useCallback((key: string) => {
        key = key.toLowerCase();
        if (!value)
            return undefined;

        const input = (value.input ?? '') + key;

        setValue({
            ...value,
            input
        });

        return input;
    }, [value]);

    const handleRibbonKeyDown = useCallback((e: KeyboardEvent): boolean => {
        if (!editor || e.isComposing || !value || value.type !== 'ribbon')
            return false;

        const key = getKey(e.key);
        if (!key)
            return false;

        const ribbonTabs = tabs.filter((tab): tab is SomeRequired<EditorRibbonTab, 'accessKey'> => tab.accessKey !== undefined && tab.accessKey.toLowerCase().startsWith(key));
        if (ribbonTabs.length < 1)
            return false;

        if (ribbonTabs.length > 1)
            return true;

        const ribbonTab = ribbonTabs[0];
        if (ribbonTab.accessKey.toLowerCase() !== key)
            return false;

        setOpen(true);
        setName(ribbonTab.name);
        setValue({ type: 'tab', tabName: ribbonTab.name });
        return true;
    }, [editor, getKey, setName, setOpen, tabs, value]);

    const handleTabKeyDown = useCallback((e: KeyboardEvent): boolean => {
        if (!editor || e.isComposing || !value || value.type !== 'tab' || !value.tabName)
            return false;

        const key = getKey(e.key);
        if (!key)
            return false;

        const ribbonTab = tabs.find((tab) => tab.name === value.tabName);
        if (!ribbonTab)
            return false;

        const ribbonGroups = ribbonTab.content.filter((tabItem): tabItem is SomeRequired<EditorRibbonGroup, 'accessKey'> => {
            if (tabItem.type && tabItem.type !== 'ribbonGroup')
                return false;

            return tabItem.accessKey !== undefined && tabItem.accessKey.toLowerCase().startsWith(key);
        });
        if (ribbonGroups.length < 1)
            return false;

        if (ribbonGroups.length > 1)
            return true;

        const ribbonGroup = ribbonGroups[0];
        if (ribbonGroup.accessKey.toLowerCase() !== key)
            return false;

        setValue({ type: 'group', tabName: ribbonTab.name, groupName: ribbonGroup.name });
        return true;
    }, [editor, getKey, tabs, value]);


    const handleGroupKeyDown = useCallback((e: KeyboardEvent): boolean => {
        if (!editor || e.isComposing || !value || value.type !== 'group' || !value.tabName || !value.groupName)
            return false;

        const key = getKey(e.key);
        if (!key)
            return false;

        const ribbonTab = tabs.find((tab) => tab.name === value.tabName);
        if (!ribbonTab)
            return false;

        const ribbonGroup = ribbonTab.content.find((tabItem): tabItem is EditorRibbonGroup => {
            if (tabItem.type && tabItem.type !== 'ribbonGroup')
                return false;

            return tabItem.name === value.groupName;
        });
        if (!ribbonGroup)
            return false;

        const ribbonItems = ribbonGroup.content.filter((groupItem): groupItem is Exclude<EditorRibbonGroupItem, EditorDivider> => {
            if (groupItem.type === 'divider')
                return false;

            return groupItem.accessKey !== undefined && groupItem.accessKey.toLowerCase().startsWith(key);
        });
        if (ribbonItems.length < 1)
            return false;

        if (ribbonItems.length > 1)
            return true;

        const ribbonItem = ribbonItems[0];
        if (!ribbonItem.accessKey || ribbonItem.accessKey.toLowerCase() !== key)
            return false;

        setValue(undefined);

        switch (ribbonItem.type) {
            case 'ribbonDropdownButton':
                return true;

            case 'ribbonButton':
            default:
                ribbonItem.perform({
                    editor,
                    view: editor.view,
                    state: editor.state
                });
                return true;
        }
    }, [editor, getKey, tabs, value]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!editor || e.isComposing)
                return;

            switch (e.key) {
                case 'Escape':
                    return;

                case 'Alt':
                    if (value)
                        return;

                    e.preventDefault();
                    setValue({ type: 'ribbon' });
                    return;

                default:
                    if (!value)
                        return;

                    e.preventDefault();

                    switch (value.type) {
                        case 'ribbon':
                            if (!handleRibbonKeyDown(e))
                                setValue(undefined);
                            return;

                        case 'tab':
                            if (!handleTabKeyDown(e))
                                setValue(undefined);
                            return;

                        case 'group':
                            if (!handleGroupKeyDown(e))
                                setValue(undefined);
                            return;
                    }
                    return;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (!editor || e.isComposing || e.key !== 'Escape' || !value)
                return;

            e.preventDefault();
            setValue(undefined);
            return;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [editor, handleGroupKeyDown, handleRibbonKeyDown, handleTabKeyDown, setName, setOpen, tabs, value]);

    return (
        <RibbonAccessKeyContext.Provider value={value}>
            {children}
        </RibbonAccessKeyContext.Provider>
    );
};
