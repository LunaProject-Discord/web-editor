import { FormatStrikethroughOutlined } from '@mui/icons-material';
import { Strike } from '@tiptap/extension-strike';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const StrikeExtension = Strike;

export const StrikeCommand: EditorCommand = {
    name: 'strike',
    icon: FormatStrikethroughOutlined,
    label: '取り消し線',
    description: '選択したテキストに取り消し線をつけます。',
    keywords: ['strike', 'strikethrough', '取り消し線'],
    selected: ({ editor }) => editor.isActive('strike'),
    perform: ({ editor }) => editor.chain().focus().toggleStrike().run()
};

export const StrikeRibbonButton = asRibbonButton(
    StrikeCommand,
    {
        label: undefined,
        tooltip: {
            children: '取り消し線'
        }
    }
);
