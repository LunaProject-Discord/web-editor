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

export interface RibbonAccessKeyTarget {
    /**
     * 選択されているタブの名前
     */
    tabName?: string;
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
        if (!editor || e.isComposing || !value || value.tabName)
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
        setValue({ tabName: ribbonTab.name });
        return true;
    }, [editor, getKey, setName, setOpen, tabs, value]);

    const handleTabKeyDown = useCallback((e: KeyboardEvent): boolean => {
        if (!editor || e.isComposing || !value || !value.tabName)
            return false;

        const key = getKey(e.key);
        if (!key)
            return false;

        const ribbonTab = tabs.find((tab) => tab.name === value.tabName);
        if (!ribbonTab)
            return false;

        const ribbonItems = ribbonTab.content.filter((tabItem): tabItem is EditorRibbonGroup => !tabItem.type || tabItem.type === 'ribbonGroup')
            .flatMap((group) => group.content.filter((groupItem): groupItem is Exclude<EditorRibbonGroupItem, EditorDivider> => groupItem.type !== 'divider'))
            .filter((groupItem) => groupItem.accessKey !== undefined && groupItem.accessKey.toLowerCase().startsWith(key));

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
                    setValue({});
                    return;

                default:
                    if (!value)
                        return;

                    e.preventDefault();

                    if (value.tabName) {
                        if (!handleTabKeyDown(e))
                            setValue(undefined);
                        return;
                    }

                    if (!handleRibbonKeyDown(e))
                        setValue(undefined);
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
    }, [editor, handleRibbonKeyDown, handleTabKeyDown, setName, setOpen, tabs, value]);

    return (
        <RibbonAccessKeyContext.Provider value={value}>
            {children}
        </RibbonAccessKeyContext.Provider>
    );
};
