import type { ContactEntriesDto, ContactsApiClient } from "../types.ts";


interface ListContactsOptions {
    client: ContactsApiClient;
}

type ListContactsResponse = ContactEntriesDto;

const CONTACTS_QUERY = `*[_id == "contacts"][0].entries[]{ _key, label, value, url }`;

const listContacts = async ({ client }: ListContactsOptions): Promise<ListContactsResponse> => {
    return client.fetch<ListContactsResponse>(CONTACTS_QUERY);
};

export { listContacts };
export type { ListContactsOptions, ListContactsResponse };
