import { cn } from "@shared/lib/utilities";

import { ContactsBodyHeader } from "./layout/contacts-body-header.tsx";
import { ContactsBodyLabel } from "./list/contacts-body-label.tsx";
import { ContactsBodyLink } from "./list/contacts-body-link.tsx";
import { ContactsBodyList } from "./list/contacts-body-list.tsx";
import { ContactsBodyRow } from "./list/contacts-body-row.tsx";
import { ContactsBodyValue } from "./list/contacts-body-value.tsx";

import type { ContactsBodyHeaderProps } from "./layout/contacts-body-header.tsx";
import type { ContactsBodyLabelProps } from "./list/contacts-body-label.tsx";
import type { ContactsBodyLinkProps } from "./list/contacts-body-link.tsx";
import type { ContactsBodyListProps } from "./list/contacts-body-list.tsx";
import type { ContactsBodyRowProps } from "./list/contacts-body-row.tsx";
import type { ContactsBodyValueProps } from "./list/contacts-body-value.tsx";
import type { FC, HTMLAttributes } from "react";


type ContactsBodyProps = HTMLAttributes<HTMLElement>;

type ContactsBodyObject = FC<ContactsBodyProps> & {
    Header: FC<ContactsBodyHeaderProps>;
    List: FC<ContactsBodyListProps>;
    Row: FC<ContactsBodyRowProps>;
    Label: FC<ContactsBodyLabelProps>;
    Value: FC<ContactsBodyValueProps>;
    Link: FC<ContactsBodyLinkProps>;
};

const ContactsBody: ContactsBodyObject = ({ className, ...props }) => {
    return (
        <section
            className={cn(
                "relative z-10 grid grid-cols-12 gap-x-gutter gap-y-7",
                className
            )}
            {...props}
        />
    );
};

ContactsBody.Header = ContactsBodyHeader;
ContactsBody.List = ContactsBodyList;
ContactsBody.Row = ContactsBodyRow;
ContactsBody.Label = ContactsBodyLabel;
ContactsBody.Value = ContactsBodyValue;
ContactsBody.Link = ContactsBodyLink;
ContactsBody.displayName = "ContactsBody";

export { ContactsBody };
export type { ContactsBodyProps };
