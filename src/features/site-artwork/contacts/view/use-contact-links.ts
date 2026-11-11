import { useMemo } from "react";

import type { ContactEntry } from "@entities/site-artwork/model";


interface ContactLinkView {
    contactEntry: ContactEntry;
    linkTarget: "_blank" | undefined;
    linkRel: string | undefined;
}

interface UseContactLinksReturn {
    contactLinkViews: readonly ContactLinkView[];
}

const EXTERNAL_LINK_PREFIX = "http";
const EXTERNAL_LINK_REL = "noopener noreferrer";

const useContactLinks = (contactEntries: readonly ContactEntry[]): UseContactLinksReturn => {
    return useMemo(() => {
        const contactLinkViews = contactEntries.map((contactEntry): ContactLinkView => {
            const isExternalLink = contactEntry.url.startsWith(EXTERNAL_LINK_PREFIX);

            return {
                contactEntry,
                linkTarget: isExternalLink ? "_blank" : undefined,
                linkRel: isExternalLink ? EXTERNAL_LINK_REL : undefined,
            };
        });

        return { contactLinkViews };
    }, [contactEntries]);
};

export { useContactLinks };
export type { ContactLinkView, UseContactLinksReturn };
