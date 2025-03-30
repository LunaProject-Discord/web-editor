import { FormatBoldOutlined } from '@mui/icons-material';
import { markInputRule, markPasteRule } from '@tiptap/core';
import { Bold, starInputRegex, starPasteRegex } from '@tiptap/extension-bold';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton, isMarkAllowed } from '../../utils';

export const BoldExtension = Bold.extend({
    priority: 101,

    addInputRules() {
        return [
            markInputRule({
                find: starInputRegex,
                type: this.type
            })
        ];
    },

    addPasteRules() {
        return [
            markPasteRule({
                find: starPasteRegex,
                type: this.type
            })
        ];
    }
});

export const BoldCommand: EditorCommand = {
    name: 'bold',
    icon: FormatBoldOutlined,
    label: '太字',
    description: '選択したテキストの太字の状態を切り替えます。',
    keywords: ['bold', 'strong', '太字', 'ボールド'],
    disabled: ({ editor, state }) => {
        const currentNodePos = editor.$pos(state.selection.from);
        const currentNode = currentNodePos.node;

        return !editor.can().toggleBold() || !isMarkAllowed(currentNode, 'bold');
    },
    selected: ({ editor }) => editor.isActive('bold'),
    perform: ({ editor }) => editor.chain().focus().toggleBold().run()
};

export const BoldRibbonButton = asRibbonButton(
    BoldCommand,
    {
        label: undefined,
        accessKey: 'B',
        tooltip: {
            children: '太字'
        }
    }
);
