import { FormatStrikethroughOutlined } from '@mui/icons-material';
import { Strike } from '@tiptap/extension-strike';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const StrikeExtension = Strike;

export const StrikeCommand: EditorCommand = {
    name: 'strike',
    icon: FormatStrikethroughOutlined,
    label: '取り消し線',
    description: '選択したテキストの取り消し線の状態を切り替えます。',
    keywords: ['strike', 'strikethrough', '取り消し線'],
    disabled: ({ editor }) => !editor.can().toggleStrike(),
    selected: ({ editor }) => editor.isActive('strike'),
    perform: ({ editor }) => editor.chain().focus().toggleStrike().run()
};

export const StrikeRibbonButton = asRibbonButton(
    StrikeCommand,
    {
        label: undefined,
        accessKey: 'S',
        tooltip: {
            children: '取り消し線'
        }
    }
);
