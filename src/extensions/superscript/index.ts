import { SuperscriptOutlined } from '@mui/icons-material';
import { Superscript } from '@tiptap/extension-superscript';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton, isMarkAllowed } from '../../utils';

export const SuperscriptExtension = Superscript.extend({
    addKeyboardShortcuts() {
        return {
            'Mod-.': () => this.editor.chain().unsetSubscript().toggleSuperscript().run()
        };
    }
});

export const SuperscriptCommand: EditorCommand = {
    name: 'superscript',
    icon: SuperscriptOutlined,
    label: '上付き文字',
    description: '選択したテキストを上付き文字として表示します。',
    keywords: ['superscript', '上付き文字'],
    disabled: ({ editor, state }) => {
        const currentNodePos = editor.$pos(state.selection.from);
        const currentNode = currentNodePos.node;

        return !editor.can().toggleSuperscript() || !isMarkAllowed(currentNode, 'superscript');
    },
    selected: ({ editor }) => editor.isActive('superscript'),
    perform: ({ editor }) => editor.chain().focus().unsetSubscript().toggleSuperscript().run()
};

export const SuperscriptRibbonButton = asRibbonButton(
    SuperscriptCommand,
    {
        label: undefined,
        accessKey: 'VT',
        tooltip: {
            children: '上付き文字'
        }
    }
);
