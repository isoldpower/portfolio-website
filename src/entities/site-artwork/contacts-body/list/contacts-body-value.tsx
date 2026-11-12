import type { FC, ReactNode } from "react";


interface ContactsBodyValueProps {
    children: ReactNode;
}

const ContactsBodyValue: FC<ContactsBodyValueProps> = ({ children }) => {
    return (
        <dd className="m-0 min-w-0">
            {children}
        </dd>
    );
};

ContactsBodyValue.displayName = "ContactsBodyValue";

export { ContactsBodyValue };
export type { ContactsBodyValueProps };
