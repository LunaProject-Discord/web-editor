import { FormatItalicOutlined } from '@mui/icons-material';
import { Italic } from '@tiptap/extension-italic';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const ItalicExtension = Italic;

export const ItalicCommand: EditorCommand = {
    name: 'italic',
    icon: FormatItalicOutlined,
    label: '斜体',
    description: '選択したテキストの斜体の状態を切り替えます。',
    keywords: ['italic', '斜体', 'イタリック'],
    disabled: ({ editor }) => !editor.can().toggleItalic(),
    selected: ({ editor }) => editor.isActive('italic'),
    perform: ({ editor }) => editor.chain().focus().toggleItalic().run()
};

export const ItalicRibbonButton = asRibbonButton(
    ItalicCommand,
    {
        label: undefined,
        accessKey: 'I',
        tooltip: {
            children: '斜体'
        }
    }
);
