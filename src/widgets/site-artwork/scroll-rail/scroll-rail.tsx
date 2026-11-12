import { ScrollRail as ScrollRailBody } from "@entities/site-artwork/scroll-rail";
import { IntroReveal } from "@features/site-artwork/intro-loader";
import { useScrollRail } from "@features/site-artwork/scroll-progress";
import { AnimationComposer } from "@shared/lib/components";


interface ScrollRailProps {
    sectionIds: readonly string[];
}

function ScrollRail({ sectionIds }: ScrollRailProps) {
    const { cells, percentText, sectionText } = useScrollRail(sectionIds);

    return (
        <AnimationComposer>
            <IntroReveal order={3} />
            <ScrollRailBody>
                <ScrollRailBody.Readout value={sectionText} isAccent />
                <ScrollRailBody.Track>
                    {cells.map((cell) => (
                        <ScrollRailBody.Cell
                            key={cell.key}
                            isLit={cell.isLit}
                            isHead={cell.isHead}
                            isMark={cell.isMark}
                        />
                    ))}
                </ScrollRailBody.Track>
                <ScrollRailBody.Readout value={percentText} />
            </ScrollRailBody>
        </AnimationComposer>
    );
}

export { ScrollRail };
export type { ScrollRailProps };
