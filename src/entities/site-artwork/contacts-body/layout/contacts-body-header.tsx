import type { FC, ReactNode } from "react";


interface ContactsBodyHeaderProps {
    children: ReactNode;
}

const ContactsBodyHeader: FC<ContactsBodyHeaderProps> = ({ children }) => {
    return (
        <div className="col-span-12">
            {children}
        </div>
    );
};

ContactsBodyHeader.displayName = "ContactsBodyHeader";

export { ContactsBodyHeader };
export type { ContactsBodyHeaderProps };
