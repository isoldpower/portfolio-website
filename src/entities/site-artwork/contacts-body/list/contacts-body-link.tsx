import { cn } from "@shared/lib/utilities";
import { Text } from "@shared/ui-toolkit/typography";

import type { AnchorHTMLAttributes, FC } from "react";


type ContactsBodyLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
};

const ContactsBodyLink: FC<ContactsBodyLinkProps> = ({ className, children, ...props }) => {
    return (
        <a className={cn("break-all", className)} {...props}>
            <Text family="mono" size="md" weight="semibold" tone="accent">
                {children}
            </Text>
        </a>
    );
};

ContactsBodyLink.displayName = "ContactsBodyLink";

export { ContactsBodyLink };
export type { ContactsBodyLinkProps };
