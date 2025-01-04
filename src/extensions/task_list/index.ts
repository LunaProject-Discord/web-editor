import { TaskList } from '@tiptap/extension-task-list';
import { EditorCommand } from '../../interfaces';
import { asRibbonButton } from '../../utils';

export const TaskListExtension = TaskList;

export const TaskListCommand: EditorCommand = {
    name: 'taskList',
    label: 'チェックリスト',
    description: '選択したブロックのスタイルを段落とチェックリストの間で切り替えます。',
    keywords: ['check', 'list', 'checkList', 'task', 'taskList', 'todo', 'todoList', 'add', 'insert', 'チェック', 'リスト', 'チェックリスト', 'タスク', 'タスクリスト', 'ToDoリスト', '切り替え', '切替', 'トグル', '変更', '更新'],
    disabled: ({ editor }) => !editor.can().toggleTaskList(),
    selected: ({ editor }) => editor.isActive('taskList'),
    perform: ({ editor }) => editor.chain().focus().toggleTaskList().run()
};

export const TaskListRibbonButton = asRibbonButton(
    TaskListCommand,
    {
        label: undefined,
        accessKey: 'C',
        tooltip: {
            children: 'チェックリスト'
        }
    }
);
