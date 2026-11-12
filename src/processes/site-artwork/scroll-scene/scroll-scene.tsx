import { useScrollReveal } from "@features/site-artwork/scroll-reveal";
import { ScrollRail } from "@widgets/site-artwork/scroll-rail";


interface ScrollSceneProps {
    sectionIds: readonly string[];
}

function ScrollScene({ sectionIds }: ScrollSceneProps) {
    useScrollReveal();

    return (
        <ScrollRail sectionIds={sectionIds} />
    );
}

export { ScrollScene };
export type { ScrollSceneProps };
