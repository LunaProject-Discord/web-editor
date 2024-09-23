import { Link, LinkOptions } from '@tiptap/extension-link';

export const LinkExtension = Link.extend<LinkOptions>({
    addOptions(): LinkOptions {
        return {
            ...this.parent?.(),
            openOnClick: false
        };
    }
});
