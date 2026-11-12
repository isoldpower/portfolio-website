import { useCallback } from "react";

import { sleep } from "@shared/lib/utilities";

import type { IsAlive } from "../types.ts";


interface TickerParams {
    count: number;
    isAlive: IsAlive;
    onTick: (tick: number) => void;
    delay: () => number;
}

type UseTickerReturn = (params: TickerParams) => Promise<void>;

const useTicker = (): UseTickerReturn => {
    return useCallback(({ count, isAlive, onTick, delay }) => {
        const ticks = Array.from({ length: count }, (_, index) => {
            return index + 1;
        });

        return ticks.reduce((chain, tick) => {
            return chain.then(async () => {
                if (!isAlive()) {
                    return;
                }

                onTick(tick);
                await sleep(delay());
            });
        }, Promise.resolve());
    }, []);
};

export { useTicker };
export type { TickerParams, UseTickerReturn };
