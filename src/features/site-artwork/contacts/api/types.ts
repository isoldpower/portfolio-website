import type { SanityClient } from "@sanity/client";


type ContactsApiClient = Pick<SanityClient, "fetch">;

interface ContactsApiServers {
    contactsApi: ContactsApiClient;
}

interface ContactEntryDto {
    _key: string;
    label: string | null;
    value: string | null;
    url: string | null;
}

type ContactEntriesDto = ContactEntryDto[] | null;

export type { ContactEntriesDto, ContactEntryDto, ContactsApiClient, ContactsApiServers };
