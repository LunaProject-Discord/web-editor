import { TaskList } from '@tiptap/extension-task-list';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const TaskListExtension = TaskList;

export const TaskListCommand: EditorCommand = {
    name: 'taskList',
    label: 'チェックリスト',
    description: 'チェックリストを挿入します。',
    keywords: ['check', 'list', 'check list', 'task', 'task list', 'todo', 'チェック', 'リスト', 'チェックリスト', 'タスク', 'タスクリスト'],
    disabled: ({ editor }) => !editor.can().toggleTaskList(),
    selected: ({ editor }) => editor.isActive('taskList'),
    perform: ({ editor }) => editor.chain().focus().toggleTaskList().run()
};

export const TaskListRibbonButton = asRibbonButton(
    TaskListCommand,
    {
        label: undefined,
        tooltip: {
            children: 'チェックリスト'
        }
    }
);
