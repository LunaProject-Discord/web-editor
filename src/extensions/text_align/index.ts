import {
    FormatAlignCenterOutlined,
    FormatAlignJustifyOutlined,
    FormatAlignLeftOutlined,
    FormatAlignRightOutlined
} from '@mui/icons-material';
import { TextAlign, TextAlignOptions } from '@tiptap/extension-text-align';
import { EditorActionProps, EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export type Align = 'left' | 'center' | 'right' | 'justify';

export const TextAlignExtension = TextAlign.extend({
    addOptions(): TextAlignOptions {
        return {
            ...this.parent?.(),
            types: ['heading', 'paragraph', 'image']
        };
    }
});

const handleTextAlign = (align: Align) => ({ editor }: EditorActionProps) => {
    const chain = editor.chain().focus();

    if (editor.isActive({ textAlign: align }))
        return chain.unsetTextAlign().run();
    return chain.setTextAlign(align).run();
};

export const TextAlignLeftCommand: EditorCommand = {
    name: 'textAlignLeft',
    icon: FormatAlignLeftOutlined,
    label: '左揃え',
    description: '選択したブロック内のテキストを左揃えにします。',
    keywords: ['align', 'left', 'align left', '左揃え'],
    disabled: ({ editor }) => !editor.can().setTextAlign('left'),
    selected: ({ editor }) => editor.isActive({ textAlign: 'left' }),
    perform: handleTextAlign('left')
};

export const TextAlignCenterCommand: EditorCommand = {
    name: 'textAlignCenter',
    icon: FormatAlignCenterOutlined,
    label: '中央揃え',
    description: '選択したブロック内のテキストを中央揃えにします。',
    keywords: ['align', 'center', 'align center', '中央揃え'],
    disabled: ({ editor }) => !editor.can().setTextAlign('center'),
    selected: ({ editor }) => editor.isActive({ textAlign: 'center' }),
    perform: handleTextAlign('center')
};

export const TextAlignRightCommand: EditorCommand = {
    name: 'textAlignRight',
    icon: FormatAlignRightOutlined,
    label: '右揃え',
    description: '選択したブロック内のテキストを右揃えにします。',
    keywords: ['align', 'right', 'align right', '右揃え'],
    disabled: ({ editor }) => !editor.can().setTextAlign('right'),
    selected: ({ editor }) => editor.isActive({ textAlign: 'right' }),
    perform: handleTextAlign('right')
};

export const TextAlignJustifyCommand: EditorCommand = {
    name: 'textAlignJustify',
    icon: FormatAlignJustifyOutlined,
    label: '両端揃え',
    description: '選択したブロック内のテキストを両端揃えにします。',
    keywords: ['align', 'justify', 'align justify', '両端揃え'],
    disabled: ({ editor }) => !editor.can().setTextAlign('justify'),
    selected: ({ editor }) => editor.isActive({ textAlign: 'justify' }),
    perform: handleTextAlign('justify')
};

export const TextAlignLeftRibbonButton = asRibbonButton(
    TextAlignLeftCommand,
    {
        label: undefined,
        tooltip: {
            children: '左揃え'
        }
    }
);

export const TextAlignCenterRibbonButton = asRibbonButton(
    TextAlignCenterCommand,
    {
        label: undefined,
        tooltip: {
            children: '中央揃え'
        }
    }
);

export const TextAlignRightRibbonButton = asRibbonButton(
    TextAlignRightCommand,
    {
        label: undefined,
        tooltip: {
            children: '右揃え'
        }
    }
);

export const TextAlignJustifyRibbonButton = asRibbonButton(
    TextAlignJustifyCommand,
    {
        label: undefined,
        tooltip: {
            children: '両端揃え'
        }
    }
);

