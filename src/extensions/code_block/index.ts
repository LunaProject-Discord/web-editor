import { CodeBlockShiki, CodeBlockShikiOptions } from 'tiptap-extension-code-block-shiki';

export type CodeBlockOptions = CodeBlockShikiOptions;

export const CodeBlockExtension = CodeBlockShiki.extend({
    addOptions(): CodeBlockOptions {
        return {
            ...this.parent?.(),
            defaultTheme: 'github-dark-default'
        };
    }
});
