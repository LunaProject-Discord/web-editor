import { FormatListBulletedOutlined } from '@mui/icons-material';
import OrderedList from '@tiptap/extension-ordered-list';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const OrderedListExtension = OrderedList;

export const OrderedListCommand: EditorCommand = {
    name: 'orderedList',
    icon: FormatListBulletedOutlined,
    label: '番号付きリスト',
    description: '選択したブロックのスタイルを段落と番号付きリストの間で切り替えます。',
    keywords: ['ordered', 'list', 'orderedList', 'toggle', 'change', 'update', '番号付きリスト', 'リスト', '番号付きリスト', '切り替え', '切替', 'トグル', '変更', '更新'],
    disabled: ({ editor }) => !editor.can().toggleOrderedList(),
    selected: ({ editor }) => editor.isActive('orderedList'),
    perform: ({ editor }) => editor.chain().focus().toggleOrderedList().run()
};

export const OrderedListRibbonButton = asRibbonButton(
    OrderedListCommand,
    {
        label: undefined,
        accessKey: 'O',
        tooltip: {
            children: '番号付きリスト'
        }
    }
);
