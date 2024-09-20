import { SubscriptOutlined } from '@mui/icons-material';
import { Subscript } from '@tiptap/extension-subscript';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const SubscriptExtension = Subscript;

export const SubscriptCommand: EditorCommand = {
    name: 'subscript',
    icon: SubscriptOutlined,
    label: '下付き文字',
    description: '選択したテキストを下付き文字として表示します。',
    keywords: ['subscript', '下付き文字'],
    selected: ({ editor }) => editor.isActive('subscript'),
    perform: ({ editor }) => editor.chain().focus().unsetSuperscript().toggleSubscript().run()
};

export const SubscriptRibbonButton = asRibbonButton(
    SubscriptCommand,
    {
        label: undefined,
        tooltip: {
            children: '下付き文字'
        }
    }
);
