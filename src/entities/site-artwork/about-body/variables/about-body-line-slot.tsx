import { PlainText } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface AboutBodyLineSlotProps {
    children?: ReactNode;
}

const AboutBodyLineSlot: FC<AboutBodyLineSlotProps> = ({ children }) => {
    return (
        <PlainText className="col-[2/-1]">
            {children}
        </PlainText>
    );
};

AboutBodyLineSlot.displayName = "AboutBodyLineSlot";

export { AboutBodyLineSlot };
export type { AboutBodyLineSlotProps };
