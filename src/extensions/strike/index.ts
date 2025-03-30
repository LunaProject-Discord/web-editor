import { FormatStrikethroughOutlined } from '@mui/icons-material';
import { Strike } from '@tiptap/extension-strike';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton, isMarkAllowed } from '../../utils';

export const StrikeExtension = Strike;

export const StrikeCommand: EditorCommand = {
    name: 'strike',
    icon: FormatStrikethroughOutlined,
    label: '取り消し線',
    description: '選択したテキストの取り消し線の状態を切り替えます。',
    keywords: ['strike', 'through', 'strikethrough', '取り消し線'],
    disabled: ({ editor, state }) => {
        const currentNodePos = editor.$pos(state.selection.from);
        const currentNode = currentNodePos.node;

        return !editor.can().toggleStrike() || !isMarkAllowed(currentNode, 'strike');
    },
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
