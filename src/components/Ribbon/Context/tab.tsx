'use client';

import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';
import { EditorComponentProps, EditorRibbonTab, getEditorPredicate, useCurrentEditor } from '../../../';

export interface RibbonTabContextProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    name: string;
    setName: Dispatch<SetStateAction<string>>;

    tabs: EditorRibbonTab[];
    tab: EditorRibbonTab | undefined;
    updateTab: (name: string | undefined) => void;
}

export const RibbonTabContext = createContext<RibbonTabContextProps>({
    open: false,
    setOpen: () => undefined,
    name: '',
    setName: () => undefined,

    tabs: [],
    tab: undefined,
    updateTab: () => undefined
});

export const useRibbonTabContext = () => useContext(RibbonTabContext);

export interface RibbonTabProviderProps extends EditorComponentProps {
    tabs: EditorRibbonTab[];
    children: ReactNode;
}

export const RibbonTabProvider = ({ editor: _editor, tabs, children }: RibbonTabProviderProps) => {
    const editor = useCurrentEditor(_editor);

    const [open, setOpen] = useState(true);
    const [name, setName] = useState(tabs[0].name);
    const activeTab = tabs.find((tab) => tab.name === name);

    const updateTab = useCallback((tabName: string | undefined) => setOpen((prevState) => {
        if (prevState && name === tabName)
            return false;

        setName(name);
        return true;
    }), [name]);

    useEffect(() => {
        if (!editor || !activeTab)
            return;

        const isVisible = getEditorPredicate(activeTab.visible, editor, true);
        if (!isVisible)
            setName(tabs[0].name);
    }, [activeTab, editor, editor?.state?.selection?.$from, tabs]);

    return (
        <RibbonTabContext.Provider value={{ open, setOpen, name, setName, tabs, tab: activeTab, updateTab }}>
            {children}
        </RibbonTabContext.Provider>
    );
};
