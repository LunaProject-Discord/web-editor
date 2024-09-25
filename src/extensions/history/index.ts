import { UndoOutlined } from '@mui/icons-material';
import { History } from '@tiptap/extension-history';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const HistoryExtension = History;

export const HistoryUndoCommand: EditorCommand = {
    name: 'historyUndo',
    icon: UndoOutlined,
    label: '元に戻す',
    description: '直前の操作を元に戻します。',
    keywords: ['undo', '元に戻す', '取り消し', '取り消す', 'アンドゥ'],
    disabled: ({ editor }) => !editor.can().undo(),
    perform: ({ editor }) => editor.chain().focus().undo().run()
};

export const HistoryRedoCommand: EditorCommand = {
    name: 'historyRedo',
    icon: UndoOutlined,
    label: 'やり直す',
    description: '元に戻した操作をやり直します。',
    keywords: ['redo', 'やり直す', 'やり直し', '繰り返す', '繰り返し', 'リドゥ'],
    disabled: ({ editor }) => !editor.can().redo(),
    perform: ({ editor }) => editor.chain().focus().redo().run()
};

export const HistoryUndoRibbonButton = asRibbonButton(
    HistoryUndoCommand,
    {
        label: undefined,
        tooltip: {
            children: '元に戻す',
            placement: 'bottom'
        }
    }
);

export const HistoryRedoRibbonButton = asRibbonButton(
    HistoryRedoCommand,
    {
        label: undefined,
        tooltip: {
            children: 'やり直す',
            placement: 'bottom'
        }
    }
);
