import { useCallback } from "react";

import { AboutBody } from "@entities/site-artwork/about-body";
import { useLocalize } from "@features/localization/localized-value";
import { CursorBlink } from "@features/site-artwork/cursor-blink";
import { useRelativeLines } from "@features/site-artwork/relative-line-numbers";
import { ScrollRise } from "@features/site-artwork/scroll-reveal";
import { AnimationComposer } from "@shared/lib/components";

import type { AboutProfile } from "@entities/site-artwork/model";


interface AboutPanelProps {
    profile: AboutProfile;
}

function AboutPanel({ profile }: AboutPanelProps) {
    const localize = useLocalize();
    const { focusedLine, distanceTo, focusLine } = useRelativeLines();
    const note = localize(profile.note);
    const blankLine = profile.variables.length;
    const noteLine = blankLine + 1;

    const lineProps = useCallback((line: number) => ({
        number: distanceTo(line),
        isFocused: focusedLine === line,
        onMouseEnter: () => { focusLine(line); },
        onClick: () => { focusLine(line); },
    }), [distanceTo, focusedLine, focusLine]);

    return (
        <>
            <AnimationComposer>
                <ScrollRise />
                <AboutBody.Description>
                    {localize(profile.description)}
                </AboutBody.Description>
            </AnimationComposer>
            <AnimationComposer>
                <ScrollRise />
                <AboutBody.Variables>
                    {profile.variables.map((variable, line) => (
                        <AboutBody.VariableLine key={variable.key} {...lineProps(line)}>
                            <AboutBody.Variable
                                type={variable.type}
                                name={variable.name}
                                value={localize(variable.value)}
                            >
                                {focusedLine === line && (
                                    <AnimationComposer>
                                        <CursorBlink/>
                                        <AboutBody.LineCursor/>
                                    </AnimationComposer>
                                )}
                            </AboutBody.Variable>
                        </AboutBody.VariableLine>
                    ))}
                    {note && (
                        <>
                            <AboutBody.VariableLine {...lineProps(blankLine)}>
                                <AboutBody.LineSlot>
                                    {focusedLine === blankLine && (
                                        <AnimationComposer>
                                            <CursorBlink/>
                                            <AboutBody.LineCursor/>
                                        </AnimationComposer>
                                    )}
                                </AboutBody.LineSlot>
                            </AboutBody.VariableLine>
                            <AboutBody.VariableLine {...lineProps(noteLine)}>
                                <AboutBody.Note note={note}>
                                    {focusedLine === noteLine && (
                                        <AnimationComposer>
                                            <CursorBlink/>
                                            <AboutBody.LineCursor/>
                                        </AnimationComposer>
                                    )}
                                </AboutBody.Note>
                            </AboutBody.VariableLine>
                        </>
                    )}
                </AboutBody.Variables>
            </AnimationComposer>
        </>
    );
}

export { AboutPanel };
export type { AboutPanelProps };
