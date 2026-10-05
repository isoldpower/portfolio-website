import { useState } from "react";
import { useScreenLock } from "./use-screen-lock.ts";
import { useScrollFocus } from "./use-scroll-focus.ts";

import type { ButtonHTMLAttributes, FC, ReactNode } from "react";


interface LockScreenProps extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onClick' | 'type' | 'children'
> {
    focusTargetId?: string;
    children: (locked: boolean) => ReactNode;
}

function toggle(wasLocked: boolean): boolean {
    return !wasLocked;
}

const LockScreen: FC<LockScreenProps> = ({
    focusTargetId,
    children,
    ...props
}) => {
    const [screenLocked, setScreenLocked] = useState<boolean>(false);
    useScreenLock(screenLocked, focusTargetId);
    useScrollFocus(screenLocked, focusTargetId);

    return (
        <button
            type="button"
            aria-pressed={screenLocked}
            onClick={setScreenLocked.bind(null, toggle)}
            {...props}
        >
            {children(screenLocked)}
        </button>
    );
}


export { LockScreen };
export type { LockScreenProps };
