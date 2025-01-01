import { findChildren } from '@tiptap/core';
import { Node as ProsemirrorNode } from '@tiptap/pm/model';
import { BundledLanguage, bundledLanguages, BundledTheme, bundledThemes, createHighlighter, Highlighter } from 'shiki';

let highlighter: Highlighter | undefined;
let highlighterPromise: Promise<void> | undefined;
const loadingLanguages = new Set<BundledLanguage>();
const loadingThemes = new Set<BundledTheme>();

type HighlighterOptions = {
    themes: (BundledTheme | null | undefined)[]
    languages: (BundledLanguage | null | undefined)[]
}

export const resetHighlighter = () => {
    highlighter = undefined;
    highlighterPromise = undefined;
    loadingLanguages.clear();
    loadingThemes.clear();
};

export const getShiki = () => highlighter;

/**
 * Load the highlighter. Makes sure the highlighter is only loaded once.
 */
export const loadHighlighter = ({ themes, languages }: HighlighterOptions) => {
    if (!highlighter && !highlighterPromise) {
        highlighterPromise = createHighlighter({
            themes: themes.filter(
                (theme): theme is BundledTheme => !!theme && theme in bundledThemes
            ),
            langs: languages.filter(
                (lang): lang is BundledLanguage => !!lang && lang in bundledLanguages
            )
        }).then((h) => {
            highlighter = h;
        });
        return highlighterPromise;
    }

    if (highlighterPromise)
        return highlighterPromise;
};

/**
 * Loads a theme if it's valid and not yet loaded.
 * @returns true or false depending on if it got loaded.
 */
export const loadTheme = async (theme: BundledTheme) => {
    if (highlighter && !highlighter.getLoadedThemes().includes(theme) && !loadingThemes.has(theme) && theme in bundledThemes) {
        loadingThemes.add(theme);
        await highlighter.loadTheme(theme);
        loadingThemes.delete(theme);
        return true;
    }

    return false;
};

/**
 * Loads a language if it's valid and not yet loaded
 * @returns true or false depending on if it got loaded.
 */
export const loadLanguage = async (language: BundledLanguage) => {
    if (highlighter && !highlighter.getLoadedLanguages().includes(language) && !loadingLanguages.has(language) && language in bundledLanguages) {
        loadingLanguages.add(language);
        await highlighter.loadLanguage(language);
        loadingLanguages.delete(language);
        return true;
    }

    return false;
};

/**
 * Initializes the highlighter based on the prosemirror document,
 * with the themes and languages in the document.
 */
export const initHighlighter = async (
    {
        doc,
        name,
        defaultTheme,
        defaultLanguage
    }: {
        doc: ProsemirrorNode
        name: string
        defaultLanguage: BundledLanguage | null | undefined
        defaultTheme: BundledTheme
    }
) => {
    const codeBlocks = findChildren(doc, (node) => node.type.name === name);

    const themes = [
        ...codeBlocks.map((block) => block.node.attrs.theme as BundledTheme),
        defaultTheme
    ];
    const languages = [
        ...codeBlocks.map((block) => block.node.attrs.language as BundledLanguage),
        defaultLanguage
    ];

    if (!highlighter) {
        const loader = loadHighlighter({ languages, themes });
        await loader;
    } else {
        await Promise.all([
            ...themes.flatMap((theme) => loadTheme(theme)),
            ...languages.flatMap((language) => !!language && loadLanguage(language))
        ]);
    }
};
