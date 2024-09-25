import { FormatBoldOutlined } from '@mui/icons-material';
import { markInputRule, markPasteRule } from '@tiptap/core';
import { Bold, BoldOptions, starInputRegex, starPasteRegex } from '@tiptap/extension-bold';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const BoldExtension = Bold.extend<BoldOptions>({
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
    description: '選択したテキストを太字にします。',
    keywords: ['bold', 'strong', '太字', 'ボールド'],
    disabled: ({ editor }) => !editor.can().toggleBold(),
    selected: ({ editor }) => editor.isActive('bold'),
    perform: ({ editor }) => editor.chain().focus().toggleBold().run()
};

export const BoldRibbonButton = asRibbonButton(
    BoldCommand,
    {
        label: undefined,
        tooltip: {
            children: '太字'
        }
    }
);
