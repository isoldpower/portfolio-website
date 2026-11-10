import { useCallback, useEffect, useRef } from "react";

import { ENERGY_DECAY, ENERGY_PER_PIXEL } from "../constants.ts";


type UsePointerEnergyReturn = (delta: number) => number;

const usePointerEnergy = (isEnabled: boolean): UsePointerEnergyReturn => {
    const energy = useRef(0);

    const handlePointerMove = useCallback((event: PointerEvent) => {
        const travelled = Math.hypot(event.movementX || 0, event.movementY || 0);
        energy.current = Math.min(1, energy.current + travelled * ENERGY_PER_PIXEL);
    }, []);

    useEffect(() => {
        if (!isEnabled) {
            return;
        }

        window.addEventListener("pointermove", handlePointerMove, { passive: true });

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
        };
    }, [isEnabled, handlePointerMove]);

    return useCallback((delta: number): number => {
        energy.current *= Math.exp(-ENERGY_DECAY * delta);
        return energy.current;
    }, []);
};

export { usePointerEnergy };
export type { UsePointerEnergyReturn };
