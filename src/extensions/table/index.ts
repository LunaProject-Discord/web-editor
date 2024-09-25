import { AddOutlined, DeleteOutlined, GridOnOutlined } from '@mui/icons-material';
import { Table, TableOptions } from '@tiptap/extension-table';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const TableExtension = Table.extend<TableOptions>({
    addOptions(): TableOptions {
        return {
            ...this.parent?.(),
            resizable: true
        };
    }
});

export const TableInsertCommand: EditorCommand = {
    name: 'tableInsert',
    icon: GridOnOutlined,
    label: '表',
    description: '表を挿入します。',
    keywords: ['table', 'insert', 'add', 'create', 'テーブル', '表', '挿入'],
    disabled: ({ editor }) => !editor.can().insertTable(),
    perform: ({ editor }) => editor.chain().focus().insertTable().run()
};

export const TableDeleteCommand: EditorCommand = {
    name: 'tableDelete',
    icon: DeleteOutlined,
    label: '表を削除',
    description: '選択した表を削除します。',
    keywords: ['table', 'delete', 'remove', 'テーブル', '表', '削除', '消去'],
    disabled: ({ editor }) => !editor.can().deleteTable(),
    perform: ({ editor }) => editor.chain().focus().deleteTable().run()
};

export const TableAddRowBeforeCommand: EditorCommand = {
    name: 'tableAddRowBefore',
    icon: AddOutlined,
    label: '上に行を追加',
    description: '選択した行の上に行を追加します。',
    keywords: ['table', 'row', 'add', 'insert', 'テーブル', '行', '追加', '挿入'],
    disabled: ({ editor }) => !editor.can().addRowBefore(),
    perform: ({ editor }) => editor.chain().focus().addRowBefore().run()
};

export const TableAddRowAfterCommand: EditorCommand = {
    name: 'tableAddRowAfter',
    icon: AddOutlined,
    label: '下に行を追加',
    description: '選択した行の下に行を追加します。',
    keywords: ['table', 'row', 'add', 'insert', 'テーブル', '行', '追加', '挿入'],
    disabled: ({ editor }) => !editor.can().addRowAfter(),
    perform: ({ editor }) => editor.chain().focus().addRowAfter().run()
};

export const TableDeleteRowCommand: EditorCommand = {
    name: 'tableDeleteRow',
    icon: DeleteOutlined,
    label: '行を削除',
    description: '選択した行を削除します。',
    keywords: ['table', 'row', 'delete', 'remove', 'テーブル', '行', '削除', '消去'],
    disabled: ({ editor }) => !editor.can().deleteRow(),
    perform: ({ editor }) => editor.chain().focus().deleteRow().run()
};

export const TableAddColumnBeforeCommand: EditorCommand = {
    name: 'tableAddColumnBefore',
    icon: AddOutlined,
    label: '左に列を追加',
    description: '選択した列の左に列を追加します。',
    keywords: ['table', 'column', 'add', 'insert', 'テーブル', '列', '追加', '挿入'],
    disabled: ({ editor }) => !editor.can().addColumnBefore(),
    perform: ({ editor }) => editor.chain().focus().addColumnBefore().run()
};

export const TableAddColumnAfterCommand: EditorCommand = {
    name: 'tableAddColumnAfter',
    icon: AddOutlined,
    label: '右に列を追加',
    description: '選択した列の右に列を追加します。',
    keywords: ['table', 'column', 'add', 'insert', 'テーブル', '列', '追加', '挿入'],
    disabled: ({ editor }) => !editor.can().addColumnAfter(),
    perform: ({ editor }) => editor.chain().focus().addColumnAfter().run()
};

export const TableDeleteColumnCommand: EditorCommand = {
    name: 'tableDeleteColumn',
    icon: DeleteOutlined,
    label: '列を削除',
    description: '選択した列を削除します。',
    keywords: ['table', 'column', 'delete', 'remove', 'テーブル', '列', '削除', '消去'],
    disabled: ({ editor }) => !editor.can().deleteColumn(),
    perform: ({ editor }) => editor.chain().focus().deleteColumn().run()
};

export const TableInsertRibbonButton = asRibbonButton(TableInsertCommand, {});

export const TableDeleteRibbonButton = asRibbonButton(TableDeleteCommand, {});

export const TableAddRowBeforeRibbonButton = asRibbonButton(TableAddRowBeforeCommand, {});

export const TableAddRowAfterRibbonButton = asRibbonButton(TableAddRowAfterCommand, {});

export const TableDeleteRowRibbonButton = asRibbonButton(TableDeleteRowCommand, {});

export const TableAddColumnBeforeRibbonButton = asRibbonButton(TableAddColumnBeforeCommand, {});

export const TableAddColumnAfterRibbonButton = asRibbonButton(TableAddColumnAfterCommand, {});

export const TableDeleteColumnRibbonButton = asRibbonButton(TableDeleteColumnCommand, {});
