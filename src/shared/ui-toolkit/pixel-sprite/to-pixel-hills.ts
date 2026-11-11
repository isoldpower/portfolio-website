import type { PixelHills } from "./types.ts";


const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const SVG_DATA_PREFIX = "data:image/svg+xml,";
const HILL_PHASE_SHIFT = 1.7;

const hillTop = (hills: PixelHills, x: number): number => {
    const period = 2 * Math.PI / hills.tileWidth;
    const y = hills.waves.reduce((sum, wave, order) => {
        return sum + hills.amplitude / (order + 1) * Math.sin(wave * period * x + order * HILL_PHASE_SHIFT);
    }, hills.base);

    return hills.height - Math.round(y / hills.step) * hills.step;
};

const outlineStep = (hills: PixelHills, x: number): string => {
    const top = String(hillTop(hills, x));
    const left = ["L", String(x), " ", top].join("");
    const right = ["L", String(x + hills.step), " ", top].join("");

    return left + right;
};

const outlinePath = (hills: PixelHills): string => {
    const width = String(hills.tileWidth);
    const height = String(hills.height);
    const steps = Array.from({ length: hills.tileWidth / hills.step }, (_, index) => {
        return outlineStep(hills, index * hills.step);
    });
    const start = ["M0", height].join(" ");
    const end = ["L", width, " ", height, "Z"].join("");

    return start + steps.join("") + end;
};

const toPixelHills = (hills: PixelHills): string => {
    const svgOpen = `<svg xmlns="${SVG_NAMESPACE}" width="${String(hills.tileWidth)}" height="${String(hills.height)}" shape-rendering="crispEdges">`;
    const path = `<path d="${outlinePath(hills)}" fill="${hills.fill}"/>`;
    const svgClose = "</svg>";

    return SVG_DATA_PREFIX + encodeURIComponent(svgOpen + path + svgClose);
};

export { toPixelHills };
