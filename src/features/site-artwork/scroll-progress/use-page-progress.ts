import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";


gsap.registerPlugin(ScrollTrigger, useGSAP);

const usePageProgress = (): number => {
    const [percent, setPercent] = useState(0);

    useGSAP(() => {
        ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (activeTrigger) => {
                setPercent(Math.round(activeTrigger.progress * 100));
            },
        });
    });

    return percent;
};

export { usePageProgress };
