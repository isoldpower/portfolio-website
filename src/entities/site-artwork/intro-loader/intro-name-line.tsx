import { cn } from "@shared/lib/utilities";

import { IntroNameLineGloss } from "./name-line/intro-name-line-gloss.tsx";
import { IntroNameLineProgressBar } from "./name-line/intro-name-line-progress-bar.tsx";
import { IntroNameLineTypingCursor } from "./name-line/intro-name-line-typing-cursor.tsx";
import { IntroNameLineWord } from "./name-line/intro-name-line-word.tsx";

import type { IntroNameLineGlossProps } from "./name-line/intro-name-line-gloss.tsx";
import type { IntroNameLineProgressBarProps } from "./name-line/intro-name-line-progress-bar.tsx";
import type { IntroNameLineTypingCursorProps } from "./name-line/intro-name-line-typing-cursor.tsx";
import type { IntroNameLineWordProps } from "./name-line/intro-name-line-word.tsx";
import type { FC, HTMLAttributes } from "react";


type IntroNameLineProps = HTMLAttributes<HTMLDivElement>;

type IntroNameLineObject = FC<IntroNameLineProps> & {
    Word: FC<IntroNameLineWordProps>;
    TypingCursor: FC<IntroNameLineTypingCursorProps>;
    Gloss: FC<IntroNameLineGlossProps>;
    ProgressBar: FC<IntroNameLineProgressBarProps>;
};

const IntroNameLine: IntroNameLineObject = ({ className, ...props }) => {
    return (
        <div
            className={cn("relative flex items-center whitespace-pre", className)}
            {...props}
        />
    );
};

IntroNameLine.Word = IntroNameLineWord;
IntroNameLine.TypingCursor = IntroNameLineTypingCursor;
IntroNameLine.Gloss = IntroNameLineGloss;
IntroNameLine.ProgressBar = IntroNameLineProgressBar;
IntroNameLine.displayName = "IntroNameLine";

export { IntroNameLine };
export type { IntroNameLineProps };
