import { textblockTypeInputRule } from '@tiptap/core';
import { Heading, HeadingOptions } from '@tiptap/extension-heading';

export const HeadingExtension = Heading.extend<HeadingOptions>({
    addOptions() {
        return {
            levels: [2, 3, 4],
            HTMLAttributes: {}
        };
    },

    addAttributes() {
        return {
            level: {
                default: this.options.levels[0],
                rendered: false
            }
        };
    },

    parseHTML() {
        return [
            {
                tag: 'h1',
                attrs: { level: this.options.levels[0] }
            },
            ...this.options.levels.map((level) => ({
                tag: `h${level}`,
                attrs: { level }
            }))
        ];
    },

    addKeyboardShortcuts() {
        return this.options.levels.reduce(
            (items, level) => ({
                ...items,
                ...{
                    [`Mod-Alt-${level}`]: () => this.editor.commands.toggleHeading({ level })
                }
            }),
            {
                'Mod-Alt-1': () => this.editor.commands.toggleHeading({ level: this.options.levels[0] })
            }
        );
    },

    addInputRules() {
        return [
            textblockTypeInputRule({
                find: new RegExp(`^(#)\s$`),
                type: this.type,
                getAttributes: {
                    level: this.options.levels[0]
                }
            }),
            ...this.options.levels.map((level) => textblockTypeInputRule({
                find: new RegExp(`^(#{1,${level}})\\s$`),
                type: this.type,
                getAttributes: {
                    level
                }
            }))
        ];
    }
});

