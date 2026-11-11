import type { FC, ReactNode } from "react";


interface ContactsBodyListProps {
    children: ReactNode;
}

const ContactsBodyList: FC<ContactsBodyListProps> = ({ children }) => {
    return (
        <dl className="col-span-12 m-0 flex flex-col gap-3.5">
            {children}
        </dl>
    );
};

ContactsBodyList.displayName = "ContactsBodyList";

export { ContactsBodyList };
export type { ContactsBodyListProps };
