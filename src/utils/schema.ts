import { SomeRequired } from '@lunaproject/web-core/dist/utils';
import { JSONContent } from '@tiptap/core';
import { Node as PMNode } from '@tiptap/pm/model';

export type Node = SomeRequired<JSONContent, 'type'>;
export type Mark = {
    type: string;
    attrs?: Record<string, any>;
    [key: string]: any;
};
export type Text = JSONContent & {
    type: 'text';
    text: string;
};

export const Schema = {
    node: (name: string, attrs?: Record<string, any> | null, content?: Node | Node[] | null, marks?: Mark[] | null): Node => ({
        type: name,
        attrs: attrs ?? undefined,
        content: content ? (Array.isArray(content) ? content : [content]) : undefined,
        marks: marks ?? undefined
    }),
    mark: (name: string, attrs?: Record<string, any> | null): Mark => ({
        type: name,
        attrs: attrs ?? undefined
    }),
    text: (text: string, marks?: Mark[] | null): Text => ({
        type: 'text',
        text,
        marks: marks ?? undefined
    })
} as const;

export const isMarkAllowed = (node: PMNode, markName: string) => {
    const nodeType = node.type;
    const schema = nodeType.schema;

    const markType = schema.marks[markName];
    if (!markType)
        return false;

    return nodeType.allowsMarkType(markType);
};
