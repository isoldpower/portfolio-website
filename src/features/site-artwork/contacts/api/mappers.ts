import type { ContactEntriesDto, ContactEntryDto } from "./types.ts";
import type { ContactEntry } from "@entities/site-artwork/model";


const mapContactEntry = (dto: ContactEntryDto): ContactEntry | null => {
    if (!dto.label || !dto.value || !dto.url) {
        return null;
    }

    return {
        key: dto._key,
        label: dto.label,
        value: dto.value,
        url: dto.url
    };
};

const mapContacts = (dto: ContactEntriesDto): ContactEntry[] => {
    return (dto ?? []).map(mapContactEntry).filter((entry): entry is ContactEntry => {
        return entry !== null;
    });
};

export { mapContacts };
