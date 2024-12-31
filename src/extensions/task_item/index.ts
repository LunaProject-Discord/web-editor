import { TaskItem } from '@tiptap/extension-task-item';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { TaskItemNodeView } from './components';

export const TaskItemExtension = TaskItem.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            nested: true
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(TaskItemNodeView, { as: 'li' });
    }
});

export * from './components';
