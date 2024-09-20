import { CodeOutlined } from '@mui/icons-material';
import { Code } from '@tiptap/extension-code';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const CodeExtension = Code;

export const CodeCommand: EditorCommand = {
    name: 'code',
    icon: CodeOutlined,
    label: 'インライン コード',
    description: '選択したテキストをインライン コードとして表示します。',
    keywords: ['code', 'inline code', 'コード', 'インライン コード'],
    selected: ({ editor }) => editor.isActive('code'),
    perform: ({ editor }) => editor.chain().focus().toggleCode().run()
};

export const CodeRibbonButton = asRibbonButton(
    CodeCommand,
    {
        label: undefined,
        tooltip: {
            children: 'インライン コード'
        }
    }
);
