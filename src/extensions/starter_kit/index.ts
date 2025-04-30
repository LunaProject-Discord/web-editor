import { Extension, Extensions } from '@tiptap/core';
import { BlockquoteOptions } from '@tiptap/extension-blockquote';
import { BoldOptions } from '@tiptap/extension-bold';
import { BulletListOptions } from '@tiptap/extension-bullet-list';
import { CodeOptions } from '@tiptap/extension-code';
import { DropcursorOptions } from '@tiptap/extension-dropcursor';
import { HardBreakOptions } from '@tiptap/extension-hard-break';
import { HeadingOptions } from '@tiptap/extension-heading';
import { HistoryOptions } from '@tiptap/extension-history';
import { HorizontalRuleOptions } from '@tiptap/extension-horizontal-rule';
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
    AudioExtension,
    AudioExtensionOptions,
    BlockquoteExtension,
    BoldExtension,
    BulletListExtension,
    CodeBlockExtension,
    CodeBlockOptions,
    CodeExtension,
    DocumentExtension,
    DropcursorExtension,
    GapcursorExtension,
    HardBreakExtension,
    HeadingExtension,
    HistoryExtension,
    HorizontalRuleExtension,
    ImageExtension,
    ImageExtensionOptions,
    ItalicExtension,
    LinkExtension,
    ListItemExtension,
    OrderedListExtension,
    ParagraphExtension,
    SelectionExtension,
    SelectionExtensionOptions,
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
    UnderlineExtension,
    VideoExtension,
    VideoExtensionOptions
} from '..';

export interface StarterKitExtensionOptions {
    document?: false;
    text?: false;

    paragraph?: Partial<ParagraphOptions> | false;
    heading?: Partial<HeadingOptions> | false;
    bulletList?: Partial<BulletListOptions> | false;
    orderedList?: Partial<OrderedListOptions> | false;
    listItem?: Partial<ListItemOptions> | false;
    taskList?: Partial<TaskListOptions> | false;
    taskItem?: Partial<TaskItemOptions> | false;
    table?: Partial<TableOptions> | false;
    tableRow?: Partial<TableRowOptions> | false;
    tableCell?: Partial<TableCellOptions> | false;
    tableHeader?: Partial<TableHeaderOptions> | false;
    blockquote?: Partial<BlockquoteOptions> | false;
    horizontalRule?: Partial<HorizontalRuleOptions> | false;
    codeBlock?: Partial<CodeBlockOptions> | false;
    image?: Partial<ImageExtensionOptions> | false;
    video?: Partial<VideoExtensionOptions> | false;
    audio?: Partial<AudioExtensionOptions> | false;

    bold?: Partial<BoldOptions> | false;
    italic?: Partial<ItalicOptions> | false;
    underline?: Partial<UnderlineOptions> | false;
    strike?: Partial<StrikeOptions> | false;
    code?: Partial<CodeOptions> | false;
    link?: Partial<LinkOptions> | false;
    subscript?: Partial<SubscriptExtensionOptions> | false;
    superscript?: Partial<SuperscriptExtensionOptions> | false;

    history?: Partial<HistoryOptions> | false;
    selection?: Partial<SelectionExtensionOptions> | false;
    hardBreak?: Partial<HardBreakOptions> | false;
    dropCursor?: Partial<DropcursorOptions> | false;
    gapCursor?: false;
    textAlign?: Partial<TextAlignOptions> | false;
}

export const StarterKitExtension = Extension.create<StarterKitExtensionOptions>({
    name: 'starterKit',

    addOptions(): StarterKitExtensionOptions {
        return {
            document: undefined,
            text: undefined,

            paragraph: undefined,
            heading: undefined,
            bulletList: undefined,
            orderedList: undefined,
            listItem: undefined,
            taskList: undefined,
            taskItem: undefined,
            table: undefined,
            tableRow: undefined,
            tableCell: undefined,
            tableHeader: undefined,
            blockquote: undefined,
            horizontalRule: undefined,
            codeBlock: undefined,
            image: undefined,
            video: undefined,
            audio: undefined,

            bold: undefined,
            italic: undefined,
            underline: undefined,
            strike: undefined,
            code: undefined,
            link: undefined,
            subscript: undefined,
            superscript: undefined,

            history: undefined,
            selection: undefined,
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

        if (this.options.paragraph !== false)
            extensions.push(ParagraphExtension.configure(this.options?.paragraph));
        if (this.options.heading !== false)
            extensions.push(HeadingExtension.configure(this.options?.heading));
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
        if (this.options.blockquote !== false)
            extensions.push(BlockquoteExtension.configure(this.options?.blockquote));
        if (this.options.horizontalRule !== false)
            extensions.push(HorizontalRuleExtension.configure(this.options?.horizontalRule));
        if (this.options.codeBlock !== false)
            extensions.push(CodeBlockExtension.configure(this.options?.codeBlock));
        if (this.options.image !== false)
            extensions.push(ImageExtension.configure(this.options?.image));
        if (this.options.video !== false)
            extensions.push(VideoExtension.configure(this.options?.video));
        if (this.options.audio !== false)
            extensions.push(AudioExtension.configure(this.options?.audio));

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
        if (this.options.selection !== false)
            extensions.push(SelectionExtension.configure(this.options?.selection));
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
