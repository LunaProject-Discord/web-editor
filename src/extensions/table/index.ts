import { AddOutlined, CallMergeOutlined, CallSplitOutlined, DeleteOutlined, GridOnOutlined } from '@mui/icons-material';
import { Table, TableOptions } from '@tiptap/extension-table';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const TableExtension = Table.extend({
    addOptions(): TableOptions {
        return {
            ...this.parent?.(),
            resizable: true,
            cellMinWidth: 30
        };
    }
});

export const TableInsertCommand: EditorCommand = {
    name: 'tableInsert',
    icon: GridOnOutlined,
    label: '表',
    description: '表を挿入します。',
    keywords: ['table', 'insert', 'add', 'create', '表', 'テーブル', '挿入'],
    disabled: ({ editor }) => !editor.can().insertTable(),
    perform: ({ editor }) => editor.chain().focus().insertTable().run()
};

export const TableDeleteCommand: EditorCommand = {
    name: 'tableDelete',
    icon: DeleteOutlined,
    label: '表を削除',
    description: '選択した表を削除します。',
    keywords: ['table', 'delete', 'remove', '表', 'テーブル', '削除', '消去'],
    disabled: ({ editor }) => !editor.can().deleteTable(),
    perform: ({ editor }) => editor.chain().focus().deleteTable().run()
};

export const TableAddRowBeforeCommand: EditorCommand = {
    name: 'tableAddRowBefore',
    icon: AddOutlined,
    label: '上に行を追加',
    description: '選択した行の上に行を追加します。',
    keywords: ['table', 'row', 'add', 'insert', '表', 'テーブル', '行', '追加', '挿入'],
    disabled: ({ editor }) => !editor.can().addRowBefore(),
    perform: ({ editor }) => editor.chain().focus().addRowBefore().run()
};

export const TableAddRowAfterCommand: EditorCommand = {
    name: 'tableAddRowAfter',
    icon: AddOutlined,
    label: '下に行を追加',
    description: '選択した行の下に行を追加します。',
    keywords: ['table', 'row', 'add', 'insert', '表', 'テーブル', '行', '追加', '挿入'],
    disabled: ({ editor }) => !editor.can().addRowAfter(),
    perform: ({ editor }) => editor.chain().focus().addRowAfter().run()
};

export const TableDeleteRowCommand: EditorCommand = {
    name: 'tableDeleteRow',
    icon: DeleteOutlined,
    label: '行を削除',
    description: '選択した行を削除します。',
    keywords: ['table', 'row', 'delete', 'remove', '表', 'テーブル', '行', '削除', '消去'],
    disabled: ({ editor }) => !editor.can().deleteRow(),
    perform: ({ editor }) => editor.chain().focus().deleteRow().run()
};

export const TableAddColumnBeforeCommand: EditorCommand = {
    name: 'tableAddColumnBefore',
    icon: AddOutlined,
    label: '左に列を追加',
    description: '選択した列の左に列を追加します。',
    keywords: ['table', 'column', 'add', 'insert', '表', 'テーブル', '列', '追加', '挿入'],
    disabled: ({ editor }) => !editor.can().addColumnBefore(),
    perform: ({ editor }) => editor.chain().focus().addColumnBefore().run()
};

export const TableAddColumnAfterCommand: EditorCommand = {
    name: 'tableAddColumnAfter',
    icon: AddOutlined,
    label: '右に列を追加',
    description: '選択した列の右に列を追加します。',
    keywords: ['table', 'column', 'add', 'insert', '表', 'テーブル', '列', '追加', '挿入'],
    disabled: ({ editor }) => !editor.can().addColumnAfter(),
    perform: ({ editor }) => editor.chain().focus().addColumnAfter().run()
};

export const TableDeleteColumnCommand: EditorCommand = {
    name: 'tableDeleteColumn',
    icon: DeleteOutlined,
    label: '列を削除',
    description: '選択した列を削除します。',
    keywords: ['table', 'column', 'delete', 'remove', '表', 'テーブル', '列', '削除', '消去'],
    disabled: ({ editor }) => !editor.can().deleteColumn(),
    perform: ({ editor }) => editor.chain().focus().deleteColumn().run()
};

export const TableMergeCellsCommand: EditorCommand = {
    name: 'tableMergeCells',
    icon: CallMergeOutlined,
    label: 'セルを結合',
    description: '選択したセルを結合します。',
    keywords: ['table', 'cell', 'merge', '表', 'テーブル', 'セル', '結合'],
    disabled: ({ editor }) => !editor.can().mergeCells(),
    perform: ({ editor }) => editor.chain().focus().mergeCells().run()
};

export const TableSplitCellCommand: EditorCommand = {
    name: 'tableSplitCell',
    icon: CallSplitOutlined,
    label: 'セルを分割',
    description: '選択したセルを分割します。',
    keywords: ['table', 'cell', 'split', '表', 'テーブル', 'セル', '分割'],
    disabled: ({ editor }) => !editor.can().splitCell(),
    perform: ({ editor }) => editor.chain().focus().splitCell().run()
};

export const TableToggleHeaderRowCommand: EditorCommand = {
    name: 'tableToggleHeaderRow',
    icon: undefined,
    label: '行見出し',
    description: 'テーブルの先頭行の見出し状態を切り替えます。',
    keywords: ['table', 'header', 'row', 'toggle', '表', 'テーブル', '見出し', 'ヘッダー', '行', '切り替え'],
    disabled: ({ editor }) => !editor.can().toggleHeaderRow(),
    selected: ({ editor, view }) => {
        // 現在のカーソル位置の要素を取得
        const currentNodePos = editor.$pos(view.state.selection.from);
        // currentNodePos に一番近い table を取得
        const tableNodePos = currentNodePos.closest('table');
        if (!tableNodePos)
            return false;

        // tableNodePos の最初にある tableRow を取得
        const firstTableRowNodePos = tableNodePos.querySelector('tableRow');
        if (!firstTableRowNodePos)
            return false;

        // tableRow の children が全て tableHeader であるかどうかを判定
        return firstTableRowNodePos.children?.every((nodePos) => nodePos.node?.type?.name === 'tableHeader');
    },
    perform: ({ editor }) => editor.chain().focus().toggleHeaderRow().run()
};

export const TableToggleHeaderColumnCommand: EditorCommand = {
    name: 'tableToggleHeaderColumn',
    icon: undefined,
    label: '列見出し',
    description: 'テーブルの先頭列の見出し状態を切り替えます。',
    keywords: ['table', 'header', 'column', 'toggle', '表', 'テーブル', '見出し', 'ヘッダー', '列', '切り替え'],
    disabled: ({ editor }) => !editor.can().toggleHeaderColumn(),
    perform: ({ editor }) => editor.chain().focus().toggleHeaderColumn().run()
};

export const TableToggleHeaderCellCommand: EditorCommand = {
    name: 'tableToggleHeaderCell',
    icon: undefined,
    label: 'セル見出し',
    description: '選択したセルの見出し状態を切り替えます。',
    keywords: ['table', 'header', 'cell', 'toggle', '表', 'テーブル', '見出し', 'ヘッダー', 'セル', '切り替え'],
    disabled: ({ editor }) => !editor.can().toggleHeaderCell(),
    selected: ({ editor }) => editor.isActive('tableHeader'),
    perform: ({ editor }) => editor.chain().focus().toggleHeaderCell().run()
};

export const TableInsertRibbonButton = asRibbonButton(TableInsertCommand);

export const TableDeleteRibbonButton = asRibbonButton(TableDeleteCommand);

export const TableAddRowBeforeRibbonButton = asRibbonButton(TableAddRowBeforeCommand);

export const TableAddRowAfterRibbonButton = asRibbonButton(TableAddRowAfterCommand);

export const TableDeleteRowRibbonButton = asRibbonButton(TableDeleteRowCommand);

export const TableAddColumnBeforeRibbonButton = asRibbonButton(TableAddColumnBeforeCommand);

export const TableAddColumnAfterRibbonButton = asRibbonButton(TableAddColumnAfterCommand);

export const TableDeleteColumnRibbonButton = asRibbonButton(TableDeleteColumnCommand);

export const TableMergeCellsRibbonButton = asRibbonButton(TableMergeCellsCommand);

export const TableSplitCellRibbonButton = asRibbonButton(TableSplitCellCommand);

export const TableToggleHeaderRowRibbonButton = asRibbonButton(TableToggleHeaderRowCommand);

export const TableToggleHeaderColumnRibbonButton = asRibbonButton(TableToggleHeaderColumnCommand);

export const TableToggleHeaderCellRibbonButton = asRibbonButton(TableToggleHeaderCellCommand);
