'use client';

import { ConfigContext, generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import { alpha, Box, BoxProps, getOverlayAlpha, IconButton, styled } from '@mui/material';
import clsx from 'clsx';
import React, { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
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
)(({ theme }) => {
    const scrollButtonBackgroundStyle = (direction: 'left' | 'right') => {
        const baseBackground = `linear-gradient(to ${direction}, ${(theme.vars || theme).palette.background.paper} ${theme.spacing(5.5)}, transparent)`;

        if (!theme.vars) {
            return {
                background: theme.palette.mode === 'light' ? baseBackground : `linear-gradient(${alpha('#fff', getOverlayAlpha(8))}, ${alpha('#fff', getOverlayAlpha(8))})}, ${baseBackground}`
            };
        }

        return {
            background: baseBackground,
            ...theme.applyStyles('dark', {
                background: `${theme.vars.overlays[8]}, ${baseBackground}`
            })
        };
    };

    return {
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
            marginLeft: theme.spacing(-9)
        },
        [`&:has(.${ribbonTabContentClasses.scrollButtonRight})`]: {
            marginRight: theme.spacing(-9)
        },
        [`& .${ribbonTabContentClasses.scrollButtonLeft}`]: {
            paddingLeft: theme.spacing(.5),
            paddingRight: theme.spacing(2),
            left: theme.spacing(8.5),
            display: 'flex',
            ...scrollButtonBackgroundStyle('right')
        },
        [`& .${ribbonTabContentClasses.scrollButtonRight}`]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(.5),
            right: theme.spacing(8.5),
            display: 'flex',
            ...scrollButtonBackgroundStyle('left')
        }
    };
});

export const RibbonTabContentScrollButtonRoot = styled(Box)({
    position: 'sticky',
    top: 0,
    bottom: 0,
    display: 'none',
    placeItems: 'center',
    placeContent: 'center',
    zIndex: 1
});

export type RibbonTabContentProps = EditorComponentProps & Pick<EditorRibbonTab, 'name' | 'visible' | 'content'>;

export const RibbonTabContent = ({ editor: _editor, name, visible, content }: RibbonTabContentProps) => {
    const { icons: { KeyboardArrowLeft, KeyboardArrowRight } } = useContext(ConfigContext);

    const ref = useRef<HTMLDivElement | null>(null);

    const [allowScrollLeft, setAllowScrollLeft] = useState(false);
    const [allowScrollRight, setAllowScrollRight] = useState(false);

    const updateScrollStatus = useCallback(() => {
        const element = ref.current;
        if (!element)
            return;

        setAllowScrollLeft(element.scrollWidth > element.clientWidth && element.scrollLeft > 0);
        setAllowScrollRight(element.scrollWidth > element.clientWidth && element.scrollLeft < (element.scrollWidth - element.clientWidth));
    }, []);

    const handleScrollLeftButtonClick = useCallback(() => {
        const element = ref.current;
        if (!element)
            return;

        element.scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    }, []);

    const handleScrollRightButtonClick = useCallback(() => {
        const element = ref.current;
        if (!element)
            return;

        element.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    }, []);

    useEffect(() => {
        updateScrollStatus();

        window.addEventListener('resize', updateScrollStatus);
        return () => window.removeEventListener('resize', updateScrollStatus);
    }, [name, visible, content, updateScrollStatus]);

    const editor = useCurrentEditor(_editor);
    if (!editor)
        return null;

    const isVisible = getEditorPredicate(visible, editor, true);
    if (!isVisible)
        return null;

    return (
        <RibbonTabContentRoot ref={ref} onScroll={updateScrollStatus}>
            {allowScrollLeft && <RibbonTabContentScrollButtonRoot
                className={ribbonTabContentClasses.scrollButtonLeft}
            >
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
            {allowScrollRight && <RibbonTabContentScrollButtonRoot
                className={ribbonTabContentClasses.scrollButtonRight}
            >
                <IconButton onClick={handleScrollRightButtonClick}>
                    <KeyboardArrowRight />
                </IconButton>
            </RibbonTabContentScrollButtonRoot>}
        </RibbonTabContentRoot>
    );
};
