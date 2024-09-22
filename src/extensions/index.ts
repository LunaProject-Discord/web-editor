import { Extensions } from '@tiptap/core';
import { BoldExtension } from './bold';
import { BulletListExtension } from './bullet_list';
import { CodeExtension } from './code';
import { DocumentExtension } from './document';
import { HardBreakExtension } from './hard_break';
import { HeadingExtension } from './heading';
import { HistoryExtension } from './history';
import { ImageExtension } from './image';
import { ItalicExtension } from './italic';
import { LinkExtension } from './link';
import { ListItemExtension } from './list_item';
import { OrderedListExtension } from './ordered_list';
import { ParagraphExtension } from './paragraph';
import { StrikeExtension } from './strike';
import { SubscriptExtension } from './subscript';
import { SuperscriptExtension } from './superscript';
import { TableExtension } from './table';
import { TableCellExtension } from './table_cell';
import { TableHeaderExtension } from './table_header';
import { TableRowExtension } from './table_row';
import { TaskItemExtension } from './task_item';
import { TaskListExtension } from './task_list';
import { TextExtension } from './text';
import { TextAlignExtension } from './text_align';
import { UnderlineExtension } from './underline';

export const DefaultExtensions: Extensions = [
    DocumentExtension,
    TextExtension,

    HeadingExtension,
    ParagraphExtension,
    BulletListExtension,
    OrderedListExtension,
    ListItemExtension,
    TaskListExtension,
    TaskItemExtension,
    TableExtension,
    TableRowExtension,
    TableCellExtension,
    TableHeaderExtension,
    ImageExtension,

    BoldExtension,
    ItalicExtension,
    UnderlineExtension,
    StrikeExtension,
    CodeExtension,
    LinkExtension,
    SubscriptExtension,
    SuperscriptExtension,

    HistoryExtension,
    HardBreakExtension,
    TextAlignExtension
];

export * from './bold';
export * from './bullet_list';
export * from './code';
export * from './document';
export * from './hard_break';
export * from './heading';
export * from './history';
export * from './image';
export * from './italic';
export * from './link';
export * from './list_item';
export * from './ordered_list';
export * from './paragraph';
export * from './strike';
export * from './subscript';
export * from './superscript';
export * from './table';
export * from './table_cell';
export * from './table_header';
export * from './table_row';
export * from './task_item';
export * from './task_list';
export * from './text';
export * from './text_align';
export * from './underline';
