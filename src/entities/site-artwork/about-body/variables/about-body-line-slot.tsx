import type { FC, ReactNode } from "react";


interface AboutBodyLineSlotProps {
    children?: ReactNode;
}

const AboutBodyLineSlot: FC<AboutBodyLineSlotProps> = ({ children }) => {
    return (
        <span className="col-[2/-1]">
            {children}
        </span>
    );
};

AboutBodyLineSlot.displayName = "AboutBodyLineSlot";

export { AboutBodyLineSlot };
export type { AboutBodyLineSlotProps };
