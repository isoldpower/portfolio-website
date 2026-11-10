import {LockIcon, UnlockIcon} from "lucide-react";
import type {FC, ReactNode} from "react";


interface LabeledLockIconProps {
    children: ReactNode;
}

const LabeledLockIcon: FC<LabeledLockIconProps> = ({ children }) => {
    return (
        <span className="flex justify-center gap-2">
            <LockIcon />
            {children}
        </span>
    );
}

interface LabeledUnlockIconProps {
    children: ReactNode;
}

const LabeledUnlockIcon: FC<LabeledUnlockIconProps> = ({ children }) => {
    return (
        <span className="flex justify-center gap-2">
            <UnlockIcon />
            {children}
        </span>
    );
}


export { LabeledLockIcon, LabeledUnlockIcon };