import { cn } from "@shared/lib/utilities";

import { SectionLabelRule } from "./label/section-label-rule.tsx";
import { SectionLabelTitle } from "./label/section-label-title.tsx";
import { SectionLabelTypingCursor } from "./label/section-label-typing-cursor.tsx";

import type { SectionLabelRuleProps } from "./label/section-label-rule.tsx";
import type { SectionLabelTitleProps } from "./label/section-label-title.tsx";
import type { SectionLabelTypingCursorProps } from "./label/section-label-typing-cursor.tsx";
import type { FC, HTMLAttributes, Ref } from "react";


type SectionLabelProps = HTMLAttributes<HTMLDivElement> & {
    ref?: Ref<HTMLDivElement>;
};

type SectionLabelObject = FC<SectionLabelProps> & {
    Title: FC<SectionLabelTitleProps>;
    TypingCursor: FC<SectionLabelTypingCursorProps>;
    Rule: FC<SectionLabelRuleProps>;
};

const SectionLabel: SectionLabelObject = ({ className, ...props }) => {
    return (
        <div
            className={cn("relative h-[37px] w-full", className)}
            {...props}
        />
    );
};

SectionLabel.Title = SectionLabelTitle;
SectionLabel.TypingCursor = SectionLabelTypingCursor;
SectionLabel.Rule = SectionLabelRule;
SectionLabel.displayName = "SectionLabel";

export { SectionLabel };
export type { SectionLabelProps };
