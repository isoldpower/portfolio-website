import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ContactsBodyLabelProps {
    children: ReactNode;
}

const ContactsBodyLabel: FC<ContactsBodyLabelProps> = ({ children }) => {
    return (
        <dt>
            <Text size="base" tone="strong">
                {children}
            </Text>
        </dt>
    );
};

ContactsBodyLabel.displayName = "ContactsBodyLabel";

export { ContactsBodyLabel };
export type { ContactsBodyLabelProps };
