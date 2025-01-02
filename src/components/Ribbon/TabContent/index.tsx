'use client';

import { ConfigContext, generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import { Box, BoxProps, IconButton, styled } from '@mui/material';
import clsx from 'clsx';
import React, { forwardRef, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import {
    EditorComponentProps,
    EditorRibbonTab,
    getEditorPredicate,
    RibbonDivider,
    RibbonGroup,
    useCurrentEditor
} from '../../../';

export const ribbonTabContentClasses = generateComponentClasses(
    'RibbonTabContent',
    [
        'root',
        'scrollButtonLeft',
        'scrollButtonRight'
    ]
);

export const RibbonTabContentRoot = styled(
    // eslint-disable-next-line react/display-name
    forwardRef<HTMLDivElement, BoxProps>(({ className, ...props }, ref) => (
        <Box
            ref={ref}
            className={clsx(ribbonTabContentClasses.root, className)}
            {...props}
        />
    ))
)(({ theme }) => ({
    minHeight: theme.spacing(6),
    // position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
        display: 'none'
    },
    [`&:has(.${ribbonTabContentClasses.scrollButtonLeft})`]: {
        marginLeft: theme.spacing(-(5 + 2))
    },
    [`&:has(.${ribbonTabContentClasses.scrollButtonRight})`]: {
        marginRight: theme.spacing(-(5 + 2))
    },
    [`& .${ribbonTabContentClasses.scrollButtonLeft}`]: {
        // ボタン幅: 40px + マージン: 16px
        left: theme.spacing(5 + 2),
        display: 'flex'
    },
    [`& .${ribbonTabContentClasses.scrollButtonRight}`]: {
        // ボタン幅: 40px + マージン: 16px
        right: theme.spacing(5 + 2),
        display: 'flex'
    }
}));

export const RibbonTabContentScrollButtonRoot = styled(Box)({
    position: 'sticky',
    top: 0,
    bottom: 0,
    display: 'none',
    placeItems: 'center',
    placeContent: 'center'
});

export type RibbonTabContentProps = EditorComponentProps & Pick<EditorRibbonTab, 'name' | 'visible' | 'content'>;

export const RibbonTabContent = ({ editor: _editor, name, visible, content }: RibbonTabContentProps) => {
    const { icons: { KeyboardArrowLeft, KeyboardArrowRight } } = useContext(ConfigContext);

    const ref = useRef<HTMLDivElement | null>(null);

    const hasScrollLeft = useMemo(() => {
        const element = ref.current;
        if (!element)
            return false;

        return element.scrollWidth > element.clientWidth && element.scrollLeft > 0;
    }, [name, visible, content, ref]);
    const hasScrollRight = useMemo(() => {
        const element = ref.current;
        if (!element)
            return false;

        return element.scrollWidth > element.clientWidth && element.scrollLeft < (element.scrollWidth - element.clientWidth);
    }, [name, visible, content, ref]);

    const handleScrollLeftButtonClick = useCallback(() => {
        const element = ref.current;
        if (!element)
            return;

        element.scrollLeft -= 100;
    }, []);

    const handleScrollRightButtonClick = useCallback(() => {
        const element = ref.current;
        if (!element)
            return;

        element.scrollLeft += 100;
    }, []);

    useEffect(() => console.log('hasScrollLeft', hasScrollLeft), [hasScrollLeft]);
    useEffect(() => console.log('hasScrollRight', hasScrollRight), [hasScrollRight]);

    const editor = useCurrentEditor(_editor);
    if (!editor)
        return null;

    const isVisible = getEditorPredicate(visible, editor, true);
    if (!isVisible)
        return null;

    return (
        <RibbonTabContentRoot ref={ref}>
            {hasScrollLeft && <RibbonTabContentScrollButtonRoot className={ribbonTabContentClasses.scrollButtonLeft}>
                <IconButton onClick={handleScrollLeftButtonClick}>
                    <KeyboardArrowLeft />
                </IconButton>
            </RibbonTabContentScrollButtonRoot>}
            {content.map((item, i) => {
                switch (item.type) {
                    case 'divider':
                        return (<RibbonDivider key={`divider-${i}`} />);

                    case 'ribbonGroup':
                    default:
                        return (<RibbonGroup key={item.name} tabName={name} {...item} editor={_editor} />);
                }
            })}
            {hasScrollRight && <RibbonTabContentScrollButtonRoot className={ribbonTabContentClasses.scrollButtonRight}>
                <IconButton onClick={handleScrollRightButtonClick}>
                    <KeyboardArrowRight />
                </IconButton>
            </RibbonTabContentScrollButtonRoot>}
        </RibbonTabContentRoot>
    );
};
