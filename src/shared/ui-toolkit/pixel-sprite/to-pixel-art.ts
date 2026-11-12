import type { PixelArt, PixelPalette } from "./types.ts";


interface PixelCell {
    fill: string;
    command: string;
}

const toPixelArt = (rows: readonly string[], palette: PixelPalette): PixelArt => {
    const cells = rows.flatMap((row, y) => {
        return [...row].flatMap((cell, x): PixelCell[] => {
            const fill = palette[cell];
            return fill ? [{ fill, command: `M${String(x)} ${String(y)}h1v1h-1z` }] : [];
        });
    });

    const byFill = cells.reduce((groups, { fill, command }) => {
        groups.set(fill, `${groups.get(fill) ?? ""}${command}`);
        return groups;
    }, new Map<string, string>());

    return {
        width: rows[0]?.length ?? 0,
        height: rows.length,
        layers: [...byFill].map(([fill, d]) => {
            return { fill, d };
        }),
    };
};

export { toPixelArt };
