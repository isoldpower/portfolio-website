import { useTranslation } from "react-i18next";

import { ContactsBody } from "@entities/site-artwork/contacts-body";
import { ContactsList } from "@widgets/site-artwork/contacts-list";
import { SectionHeading } from "@widgets/site-artwork/section-heading";

import type { ContactEntry } from "@entities/site-artwork/model";


interface ContactsSectionProps {
    contacts: readonly ContactEntry[];
}

function ContactsSection({ contacts }: ContactsSectionProps) {
    const { t } = useTranslation();

    return (
        <ContactsBody id="contacts" className="mt-20 md:mt-24">
            <ContactsBody.Header>
                <SectionHeading text={t("contacts.label")} />
            </ContactsBody.Header>
            <ContactsList contacts={contacts} />
        </ContactsBody>
    );
}

export { ContactsSection };
export type { ContactsSectionProps };
