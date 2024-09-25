import { FormatItalicOutlined } from '@mui/icons-material';
import { markInputRule, markPasteRule } from '@tiptap/core';
import { underscoreInputRegex, underscorePasteRegex } from '@tiptap/extension-bold';
import { Underline, UnderlineOptions } from '@tiptap/extension-underline';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const UnderlineExtension = Underline.extend<UnderlineOptions>({
    addInputRules() {
        return [
            markInputRule({
                find: underscoreInputRegex,
                type: this.type
            })
        ];
    },

    addPasteRules() {
        return [
            markPasteRule({
                find: underscorePasteRegex,
                type: this.type
            })
        ];
    }
});

export const UnderlineCommand: EditorCommand = {
    name: 'underline',
    icon: FormatItalicOutlined,
    label: '下線',
    description: '選択したテキストに下線をつけます。',
    keywords: ['underline', '下線'],
    disabled: ({ editor }) => !editor.can().toggleUnderline(),
    selected: ({ editor }) => editor.isActive('underline'),
    perform: ({ editor }) => editor.chain().focus().toggleUnderline().run()
};

export const UnderlineRibbonButton = asRibbonButton(
    UnderlineCommand,
    {
        label: undefined,
        tooltip: {
            children: '下線'
        }
    }
);
