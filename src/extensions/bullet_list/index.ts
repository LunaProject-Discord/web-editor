import { FormatListBulletedOutlined } from '@mui/icons-material';
import { BulletList } from '@tiptap/extension-bullet-list';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const BulletListExtension = BulletList;

export const BulletListCommand: EditorCommand = {
    name: 'bulletList',
    icon: FormatListBulletedOutlined,
    label: '箇条書きリスト',
    description: '箇条書きリストを挿入します。',
    keywords: ['bullet', 'list', 'bullet list', '箇条書き', 'リスト', '箇条書きリスト'],
    disabled: ({ editor }) => !editor.can().toggleBulletList(),
    selected: ({ editor }) => editor.isActive('bulletList'),
    perform: ({ editor }) => editor.chain().focus().toggleBulletList().run()
};

export const BulletListRibbonButton = asRibbonButton(
    BulletListCommand,
    {
        label: undefined,
        tooltip: {
            children: '箇条書きリスト'
        }
    }
);
