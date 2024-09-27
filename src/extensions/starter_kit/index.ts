import { Extension, Extensions } from '@tiptap/core';
import { BoldOptions } from '@tiptap/extension-bold';
import { BulletListOptions } from '@tiptap/extension-bullet-list';
import { CodeOptions } from '@tiptap/extension-code';
import { DropcursorOptions } from '@tiptap/extension-dropcursor';
import { HardBreakOptions } from '@tiptap/extension-hard-break';
import { HeadingOptions } from '@tiptap/extension-heading';
import { HistoryOptions } from '@tiptap/extension-history';
import { ImageOptions } from '@tiptap/extension-image';
import { ItalicOptions } from '@tiptap/extension-italic';
import { LinkOptions } from '@tiptap/extension-link';
import { ListItemOptions } from '@tiptap/extension-list-item';
import { OrderedListOptions } from '@tiptap/extension-ordered-list';
import { ParagraphOptions } from '@tiptap/extension-paragraph';
import { StrikeOptions } from '@tiptap/extension-strike';
import { SubscriptExtensionOptions } from '@tiptap/extension-subscript';
import { SuperscriptExtensionOptions } from '@tiptap/extension-superscript';
import { TableOptions } from '@tiptap/extension-table';
import { TableCellOptions } from '@tiptap/extension-table-cell';
import { TableHeaderOptions } from '@tiptap/extension-table-header';
import { TableRowOptions } from '@tiptap/extension-table-row';
import { TaskItemOptions } from '@tiptap/extension-task-item';
import { TaskListOptions } from '@tiptap/extension-task-list';
import { TextAlignOptions } from '@tiptap/extension-text-align';
import { UnderlineOptions } from '@tiptap/extension-underline';
import {
    BoldExtension,
    BulletListExtension,
    CodeExtension,
    DocumentExtension,
    DropcursorExtension,
    GapcursorExtension,
    HardBreakExtension,
    HeadingExtension,
    HistoryExtension,
    ImageExtension,
    ItalicExtension,
    LinkExtension,
    ListItemExtension,
    OrderedListExtension,
    ParagraphExtension,
    StrikeExtension,
    SubscriptExtension,
    SuperscriptExtension,
    TableCellExtension,
    TableExtension,
    TableHeaderExtension,
    TableRowExtension,
    TaskItemExtension,
    TaskListExtension,
    TextAlignExtension,
    TextExtension,
    UnderlineExtension
} from '..';

export interface StarterKitOptions {
    document?: false;
    text?: false;

    heading?: Partial<HeadingOptions> | false;
    paragraph?: Partial<ParagraphOptions> | false;
    bulletList?: Partial<BulletListOptions> | false;
    orderedList?: Partial<OrderedListOptions> | false;
    listItem?: Partial<ListItemOptions> | false;
    taskList?: Partial<TaskListOptions> | false;
    taskItem?: Partial<TaskItemOptions> | false;
    table?: Partial<TableOptions> | false;
    tableRow?: Partial<TableRowOptions> | false;
    tableCell?: Partial<TableCellOptions> | false;
    tableHeader?: Partial<TableHeaderOptions> | false;
    image?: Partial<ImageOptions> | false;

    bold?: Partial<BoldOptions> | false;
    italic?: Partial<ItalicOptions> | false;
    underline?: Partial<UnderlineOptions> | false;
    strike?: Partial<StrikeOptions> | false;
    code?: Partial<CodeOptions> | false;
    link?: Partial<LinkOptions> | false;
    subscript?: Partial<SubscriptExtensionOptions> | false;
    superscript?: Partial<SuperscriptExtensionOptions> | false;

    history?: Partial<HistoryOptions> | false;
    hardBreak?: Partial<HardBreakOptions> | false;
    dropCursor?: Partial<DropcursorOptions> | false;
    gapCursor?: false;
    textAlign?: Partial<TextAlignOptions> | false;
}

export const StarterKitExtension = Extension.create<StarterKitOptions>({
    name: 'starterKit',

    addOptions(): StarterKitOptions {
        return {
            document: undefined,
            text: undefined,

            heading: undefined,
            paragraph: undefined,
            bulletList: undefined,
            orderedList: undefined,
            listItem: undefined,
            taskList: undefined,
            taskItem: undefined,
            table: undefined,
            tableRow: undefined,
            tableCell: undefined,
            tableHeader: undefined,
            image: undefined,

            bold: undefined,
            italic: undefined,
            underline: undefined,
            strike: undefined,
            code: undefined,
            link: undefined,
            subscript: undefined,
            superscript: undefined,

            history: undefined,
            hardBreak: undefined,
            gapCursor: undefined,
            dropCursor: undefined,
            textAlign: undefined
        };
    },

    addExtensions() {
        const extensions: Extensions = [];

        if (this.options.document !== false)
            extensions.push(DocumentExtension.configure(this.options?.document));
        if (this.options.text !== false)
            extensions.push(TextExtension.configure(this.options?.text));

        if (this.options.heading !== false)
            extensions.push(HeadingExtension.configure(this.options?.heading));
        if (this.options.paragraph !== false)
            extensions.push(ParagraphExtension.configure(this.options?.paragraph));
        if (this.options.bulletList !== false)
            extensions.push(BulletListExtension.configure(this.options?.bulletList));
        if (this.options.orderedList !== false)
            extensions.push(OrderedListExtension.configure(this.options?.orderedList));
        if (this.options.listItem !== false)
            extensions.push(ListItemExtension.configure(this.options?.listItem));
        if (this.options.taskList !== false)
            extensions.push(TaskListExtension.configure(this.options?.taskList));
        if (this.options.taskItem !== false)
            extensions.push(TaskItemExtension.configure(this.options?.taskItem));
        if (this.options.table !== false)
            extensions.push(TableExtension.configure(this.options?.table));
        if (this.options.tableRow !== false)
            extensions.push(TableRowExtension.configure(this.options?.tableRow));
        if (this.options.tableCell !== false)
            extensions.push(TableCellExtension.configure(this.options?.tableCell));
        if (this.options.tableHeader !== false)
            extensions.push(TableHeaderExtension.configure(this.options?.tableHeader));
        if (this.options.image !== false)
            extensions.push(ImageExtension.configure(this.options?.image));

        if (this.options.bold !== false)
            extensions.push(BoldExtension.configure(this.options?.bold));
        if (this.options.italic !== false)
            extensions.push(ItalicExtension.configure(this.options?.italic));
        if (this.options.underline !== false)
            extensions.push(UnderlineExtension.configure(this.options?.underline));
        if (this.options.strike !== false)
            extensions.push(StrikeExtension.configure(this.options?.strike));
        if (this.options.code !== false)
            extensions.push(CodeExtension.configure(this.options?.code));
        if (this.options.link !== false)
            extensions.push(LinkExtension.configure(this.options?.link));
        if (this.options.subscript !== false)
            extensions.push(SubscriptExtension.configure(this.options?.subscript));
        if (this.options.superscript !== false)
            extensions.push(SuperscriptExtension.configure(this.options?.superscript));

        if (this.options.history !== false)
            extensions.push(HistoryExtension.configure(this.options?.history));
        if (this.options.hardBreak !== false)
            extensions.push(HardBreakExtension.configure(this.options?.hardBreak));
        if (this.options.dropCursor !== false)
            extensions.push(DropcursorExtension.configure(this.options?.dropCursor));
        if (this.options.gapCursor !== false)
            extensions.push(GapcursorExtension.configure(this.options?.gapCursor));
        if (this.options.textAlign !== false)
            extensions.push(TextAlignExtension.configure(this.options?.textAlign));

        return extensions;
    }
});
