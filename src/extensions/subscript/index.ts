import { SubscriptOutlined } from '@mui/icons-material';
import { Subscript } from '@tiptap/extension-subscript';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton, isMarkAllowed } from '../../utils';

export const SubscriptExtension = Subscript.extend({
    addKeyboardShortcuts() {
        return {
            'Mod-,': () => this.editor.chain().unsetSuperscript().toggleSubscript().run()
        };
    }
});

export const SubscriptCommand: EditorCommand = {
    name: 'subscript',
    icon: SubscriptOutlined,
    label: '下付き文字',
    description: '選択したテキストを下付き文字として表示します。',
    keywords: ['subscript', '下付き文字'],
    disabled: ({ editor, state }) => {
        const currentNodePos = editor.$pos(state.selection.from);
        const currentNode = currentNodePos.node;

        return !editor.can().toggleSubscript() || !isMarkAllowed(currentNode, 'subscript');
    },
    selected: ({ editor }) => editor.isActive('subscript'),
    perform: ({ editor }) => editor.chain().focus().unsetSuperscript().toggleSubscript().run()
};

export const SubscriptRibbonButton = asRibbonButton(
    SubscriptCommand,
    {
        label: undefined,
        accessKey: 'VB',
        tooltip: {
            children: '下付き文字'
        }
    }
);
