import { cn } from "@shared/lib/utilities";

import type { FC, ReactNode } from "react";


interface ContactsBodyRowProps {
    children: ReactNode;
}

const ContactsBodyRow: FC<ContactsBodyRowProps> = ({ children }) => {
    return (
        <div
            className={cn(
                "grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline gap-x-4",
                "md:grid-cols-[10rem_minmax(0,1fr)]"
            )}
        >
            {children}
        </div>
    );
};

ContactsBodyRow.displayName = "ContactsBodyRow";

export { ContactsBodyRow };
export type { ContactsBodyRowProps };
