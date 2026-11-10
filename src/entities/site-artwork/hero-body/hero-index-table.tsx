import { cn } from "@shared/lib/utilities";

import { HeroIndexAssignment } from "./index-table/hero-index-assignment.tsx";
import { HeroIndexComment } from "./index-table/hero-index-comment.tsx";
import { HeroIndexLink } from "./index-table/hero-index-link.tsx";
import { HeroIndexModeList } from "./index-table/hero-index-mode-list.tsx";
import { HeroIndexModeOption } from "./index-table/hero-index-mode-option.tsx";
import { HeroIndexRow } from "./index-table/hero-index-row.tsx";
import { HeroIndexTypedValue } from "./index-table/hero-index-typed-value.tsx";
import { HeroIndexTypingCursor } from "./index-table/hero-index-typing-cursor.tsx";

import type { HeroIndexAssignmentProps } from "./index-table/hero-index-assignment.tsx";
import type { HeroIndexCommentProps } from "./index-table/hero-index-comment.tsx";
import type { HeroIndexLinkProps } from "./index-table/hero-index-link.tsx";
import type { HeroIndexModeListProps } from "./index-table/hero-index-mode-list.tsx";
import type { HeroIndexModeOptionProps } from "./index-table/hero-index-mode-option.tsx";
import type { HeroIndexRowProps } from "./index-table/hero-index-row.tsx";
import type { HeroIndexTypedValueProps } from "./index-table/hero-index-typed-value.tsx";
import type { HeroIndexTypingCursorProps } from "./index-table/hero-index-typing-cursor.tsx";
import type { FC, HTMLAttributes } from "react";


type HeroIndexTableProps = HTMLAttributes<HTMLDivElement>;

type HeroIndexTableObject = FC<HeroIndexTableProps> & {
    Row: FC<HeroIndexRowProps>;
    Assignment: FC<HeroIndexAssignmentProps>;
    TypedValue: FC<HeroIndexTypedValueProps>;
    TypingCursor: FC<HeroIndexTypingCursorProps>;
    ModeList: FC<HeroIndexModeListProps>;
    ModeOption: FC<HeroIndexModeOptionProps>;
    Link: FC<HeroIndexLinkProps>;
    Comment: FC<HeroIndexCommentProps>;
};

const HeroIndexTable: HeroIndexTableObject = ({ className, ...props }) => {
    return (
        <div
            className={cn(
                "mt-24 w-full max-w-[470px] border-b border-dashed border-extrude",
                "font-mono text-md text-foreground max-xs:text-sm",
                "md:mt-40 lg:mt-48",
                className
            )}
            {...props}
        />
    );
};

HeroIndexTable.Row = HeroIndexRow;
HeroIndexTable.Assignment = HeroIndexAssignment;
HeroIndexTable.TypedValue = HeroIndexTypedValue;
HeroIndexTable.TypingCursor = HeroIndexTypingCursor;
HeroIndexTable.ModeList = HeroIndexModeList;
HeroIndexTable.ModeOption = HeroIndexModeOption;
HeroIndexTable.Link = HeroIndexLink;
HeroIndexTable.Comment = HeroIndexComment;
HeroIndexTable.displayName = "HeroIndexTable";

export { HeroIndexTable };
export type { HeroIndexTableProps };
