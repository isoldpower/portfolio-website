import { ContactsBody } from "@entities/site-artwork/contacts-body";
import { useContactLinks } from "@features/site-artwork/contacts";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { LinkHover } from "@features/site-artwork/link-hover";
import { ScrollStagger } from "@features/site-artwork/scroll-reveal";
import { AnimationComposer } from "@shared/lib/components";

import type { ContactEntry } from "@entities/site-artwork/model";


interface ContactsListProps {
    contacts: readonly ContactEntry[];
}

function ContactsList({ contacts }: ContactsListProps) {
    const { contactLinkViews } = useContactLinks(contacts);

    return (
        <AnimationComposer>
            <ScrollStagger />
            <ContactsBody.List>
                {contactLinkViews.map(({ contactEntry, linkTarget, linkRel }) => (
                    <ContactsBody.Row key={contactEntry.key}>
                        <ContactsBody.Label>
                            {contactEntry.label}
                        </ContactsBody.Label>
                        <ContactsBody.Value>
                            <AnimationComposer>
                                <FocusOutline />
                                <LinkHover />
                                <ContactsBody.Link href={contactEntry.url} target={linkTarget} rel={linkRel}>
                                    {contactEntry.value}
                                </ContactsBody.Link>
                            </AnimationComposer>
                        </ContactsBody.Value>
                    </ContactsBody.Row>
                ))}
            </ContactsBody.List>
        </AnimationComposer>
    );
}

export { ContactsList };
export type { ContactsListProps };
