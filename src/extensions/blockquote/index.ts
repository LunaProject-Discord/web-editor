import { FormatQuoteOutlined } from '@mui/icons-material';
import { Blockquote } from '@tiptap/extension-blockquote';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const BlockquoteExtension = Blockquote;

export const BlockquoteCommand: EditorCommand = {
    name: 'blockquote',
    icon: FormatQuoteOutlined,
    label: '引用',
    description: '選択したブロックのスタイルを段落と引用ブロックの間で切り替えます。',
    keywords: ['block', 'quote', 'blockQuote', 'toggle', 'change', 'update', '引用', '引用ブロック', 'クオート', 'クオートブロック', '切り替え', '切替', 'トグル', '変更', '更新'],
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
