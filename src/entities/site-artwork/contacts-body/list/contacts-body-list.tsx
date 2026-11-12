import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes, ReactNode } from "react";


type ContactsBodyListProps = HTMLAttributes<HTMLElement> & {
    children: ReactNode;
};

const ContactsBodyList: FC<ContactsBodyListProps> = ({ className, children, ...props }) => {
    return (
        <dl className={cn("col-span-12 m-0 flex flex-col gap-3.5", className)} {...props}>
            {children}
        </dl>
    );
};

ContactsBodyList.displayName = "ContactsBodyList";

export { ContactsBodyList };
export type { ContactsBodyListProps };
