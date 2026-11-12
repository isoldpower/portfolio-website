type PixelPalette = Readonly<Record<string, string>>;

interface PixelLayer {
    fill: string;
    d: string;
}

interface PixelArt {
    width: number;
    height: number;
    layers: PixelLayer[];
}

interface PixelHills {
    tileWidth: number;
    height: number;
    base: number;
    amplitude: number;
    waves: readonly number[];
    step: number;
    fill: string;
}

export type { PixelArt, PixelHills, PixelLayer, PixelPalette };
