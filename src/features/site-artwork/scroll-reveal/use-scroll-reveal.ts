import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION_QUERY } from "./constants.ts";
import { useEnterReveals } from "./engine/use-enter-reveals.ts";
import { useParallaxDrift } from "./engine/use-parallax-drift.ts";


gsap.registerPlugin(ScrollTrigger, useGSAP);

const useScrollReveal = (): void => {
    const addEnterReveals = useEnterReveals();
    const addParallaxDrift = useParallaxDrift();

    useGSAP(() => {
        gsap.matchMedia().add(MOTION_QUERY, () => {
            addEnterReveals();
            addParallaxDrift();
        });
    }, { dependencies: [addEnterReveals, addParallaxDrift] });
};

export { useScrollReveal };
