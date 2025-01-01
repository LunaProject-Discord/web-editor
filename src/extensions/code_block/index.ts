import CodeBlock, { CodeBlockOptions as TiptapCodeBlockOptions } from '@tiptap/extension-code-block';
import { BundledLanguage, BundledTheme } from 'shiki';
import { ShikiPlugin } from './plugin';

export interface CodeBlockOptions extends TiptapCodeBlockOptions {
    defaultLanguage: BundledLanguage | null | undefined;
    defaultTheme: BundledTheme;
}

export const CodeBlockExtension = CodeBlock.extend<CodeBlockOptions>({
    addOptions() {
        return {
            ...this.parent?.(),
            defaultLanguage: null,
            defaultTheme: 'github-dark'
        };
    },

    addProseMirrorPlugins() {
        return [
            ...(this.parent?.() || []),
            ShikiPlugin({
                name: this.name,
                defaultLanguage: this.options.defaultLanguage,
                defaultTheme: this.options.defaultTheme
            })
        ];
    }
});
