import { FormatListBulletedOutlined } from '@mui/icons-material';
import { BulletList } from '@tiptap/extension-bullet-list';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const BulletListExtension = BulletList;

export const BulletListCommand: EditorCommand = {
    name: 'bulletList',
    icon: FormatListBulletedOutlined,
    label: '箇条書きリスト',
    description: '選択したブロックのスタイルを段落と箇条書きリストの間で切り替えます。',
    keywords: ['bullet', 'list', 'bulletList', 'toggle', 'change', 'update', '箇条書き', 'リスト', '箇条書きリスト', '切り替え', '切替', 'トグル', '変更', '更新'],
    disabled: ({ editor }) => !editor.can().toggleBulletList(),
    selected: ({ editor }) => editor.isActive('bulletList'),
    perform: ({ editor }) => editor.chain().focus().toggleBulletList().run()
};

export const BulletListRibbonButton = asRibbonButton(
    BulletListCommand,
    {
        label: undefined,
        accessKey: 'U',
        tooltip: {
            children: '箇条書きリスト'
        }
    }
);
