import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { Extension } from '@tiptap/react';

export interface SelectionExtensionOptions {
    className: string;
}

export const SelectionExtension = Extension.create<SelectionExtensionOptions>({
    name: 'selection',

    addOptions() {
        return {
            className: 'selection'
        };
    },

    addProseMirrorPlugins() {
        const { name, options, editor } = this;
        return [
            new Plugin({
                key: new PluginKey(name),
                props: {
                    decorations(state) {
                        if (state.selection.empty)
                            return null;

                        if (editor.isFocused || !editor.isEditable)
                            return null;

                        return DecorationSet.create(
                            state.doc,
                            [
                                Decoration.inline(
                                    state.selection.from,
                                    state.selection.to,
                                    {
                                        class: options.className
                                    }
                                )
                            ]
                        );
                    }
                }
            })
        ];
    }
});
