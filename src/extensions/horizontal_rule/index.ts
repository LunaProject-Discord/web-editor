import { HorizontalRuleOutlined } from '@mui/icons-material';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const HorizontalRuleExtension = HorizontalRule;

export const HorizontalRuleCommand: EditorCommand = {
    name: 'horizontalRule',
    icon: HorizontalRuleOutlined,
    label: '水平線',
    description: '水平線を挿入します。',
    keywords: ['horizontal', 'rule', 'horizontalRule', 'divider', 'separator', 'hr', '水平線', 'セパレーター', '区切り', '罫線'],
    disabled: ({ editor }) => !editor.can().setHorizontalRule(),
    perform: ({ editor }) => editor.chain().focus().setHorizontalRule().run()
};

export const HorizontalRuleRibbonButton = asRibbonButton(
    HorizontalRuleCommand,
    {
        label: undefined,
        accessKey: 'D',
        tooltip: {
            children: '水平'
        }
    }
);
