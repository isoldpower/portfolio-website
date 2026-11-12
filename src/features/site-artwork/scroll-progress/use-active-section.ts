import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useState } from "react";

import { SECTION_LINE } from "./constants.ts";


gsap.registerPlugin(ScrollTrigger, useGSAP);

interface UseActiveSectionReturn {
    activeIndex: number;
    sectionCount: number;
    sectionStarts: readonly number[];
}

const useActiveSection = (sectionIds: readonly string[]): UseActiveSectionReturn => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [sectionCount, setSectionCount] = useState(0);
    const [sectionStarts, setSectionStarts] = useState<readonly number[]>([]);

    const findSections = useCallback(() => {
        return sectionIds
            .map((sectionId) => document.getElementById(sectionId))
            .filter((section): section is HTMLElement => section !== null);
    }, [sectionIds]);

    useGSAP(() => {
        const sections = findSections();
        const triggers = sections.map((section, index) => {
            return ScrollTrigger.create({
                trigger: section,
                start: SECTION_LINE,
                onEnter: () => {
                    setActiveIndex(index);
                },
                onLeaveBack: () => {
                    setActiveIndex(index - 1);
                },
            });
        });

        setSectionCount(sections.length);
        ScrollTrigger.create({
            start: 0,
            end: "max",
            onRefresh: (pageTrigger) => {
                const range = Math.max(pageTrigger.end - pageTrigger.start, 1);
                setSectionStarts(
                    triggers.map((sectionTrigger) => Math.min(sectionTrigger.start / range, 1))
                );
            },
        });
    }, { dependencies: [findSections] });

    return { activeIndex, sectionCount, sectionStarts };
};

export { useActiveSection };
export type { UseActiveSectionReturn };
