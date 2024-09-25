import { FormatListBulletedOutlined } from '@mui/icons-material';
import OrderedList from '@tiptap/extension-ordered-list';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const OrderedListExtension = OrderedList;

export const OrderedListCommand: EditorCommand = {
    name: 'orderedList',
    icon: FormatListBulletedOutlined,
    label: '番号付きリスト',
    description: '番号付きリストを挿入します。',
    keywords: ['ordered', 'list', 'ordered list', '番号付き', 'リスト', '番号付きリスト'],
    disabled: ({ editor }) => !editor.can().toggleOrderedList(),
    selected: ({ editor }) => editor.isActive('orderedList'),
    perform: ({ editor }) => editor.chain().focus().toggleOrderedList().run()
};

export const OrderedListRibbonButton = asRibbonButton(
    OrderedListCommand,
    {
        label: undefined,
        tooltip: {
            children: '番号付きリスト'
        }
    }
);
