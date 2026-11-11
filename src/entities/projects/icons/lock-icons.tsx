import { LockIcon, UnlockIcon } from "lucide-react";

import { PlainText } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface LabeledLockIconProps {
    children: ReactNode;
}

const LabeledLockIcon: FC<LabeledLockIconProps> = ({ children }) => {
    return (
        <PlainText className="flex justify-center gap-2">
            <LockIcon />
            {children}
        </PlainText>
    );
}

interface LabeledUnlockIconProps {
    children: ReactNode;
}

const LabeledUnlockIcon: FC<LabeledUnlockIconProps> = ({ children }) => {
    return (
        <PlainText className="flex justify-center gap-2">
            <UnlockIcon />
            {children}
        </PlainText>
    );
}


export { LabeledLockIcon, LabeledUnlockIcon };