import { Link, LinkOptions } from '@tiptap/extension-link';

export const LinkExtension = Link.extend({
    addOptions(): LinkOptions {
        return {
            ...this.parent?.(),
            openOnClick: false
        };
    }
});
