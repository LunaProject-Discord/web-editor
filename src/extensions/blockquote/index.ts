import { FormatQuoteOutlined } from '@mui/icons-material';
import { Blockquote } from '@tiptap/extension-blockquote';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const BlockquoteExtension = Blockquote;

export const BlockquoteCommand: EditorCommand = {
    name: 'blockquote',
    icon: FormatQuoteOutlined,
    label: '引用',
    description: '引用ブロックを挿入します。',
    keywords: ['block', 'quote', 'blockquote', '箇条書き', 'リスト', '箇条書きリスト'],
    disabled: ({ editor }) => !editor.can().toggleBlockquote(),
    selected: ({ editor }) => editor.isActive('blockquote'),
    perform: ({ editor }) => editor.chain().focus().toggleBlockquote().run()
};

export const BlockquoteRibbonButton = asRibbonButton(
    BlockquoteCommand,
    {
        label: undefined,
        accessKey: 'Q',
        tooltip: {
            children: '引用'
        }
    }
);
