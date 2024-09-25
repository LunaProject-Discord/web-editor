import { SuperscriptOutlined } from '@mui/icons-material';
import { Superscript } from '@tiptap/extension-superscript';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const SuperscriptExtension = Superscript;

export const SuperscriptCommand: EditorCommand = {
    name: 'superscript',
    icon: SuperscriptOutlined,
    label: '上付き文字',
    description: '選択したテキストを上付き文字として表示します。',
    keywords: ['superscript', '上付き文字'],
    disabled: ({ editor }) => !editor.can().toggleSuperscript(),
    selected: ({ editor }) => editor.isActive('superscript'),
    perform: ({ editor }) => editor.chain().focus().unsetSubscript().toggleSuperscript().run()
};

export const SuperscriptRibbonButton = asRibbonButton(
    SuperscriptCommand,
    {
        label: undefined,
        tooltip: {
            children: '上付き文字'
        }
    }
);
