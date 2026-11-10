import type { OrthographicCamera, WebGLRenderTarget } from "three";


interface AsciiGrid {
    columns: number;
    rows: number;
    width: number;
    height: number;
    pixelRatio: number;
}

interface AsciiPalette {
    colors: readonly string[];
    font: string;
    isReady: boolean;
}

interface AsciiTarget {
    camera: OrthographicCamera;
    renderTarget: WebGLRenderTarget;
    pixels: Uint8Array;
    isFitted: boolean;
}

interface AsciiCell {
    x: number;
    y: number;
    offset: number;
}

interface AsciiLayout {
    cells: readonly AsciiCell[];
    sampleOffsets: readonly number[];
}

interface CellSample {
    coverage: number;
    luminance: number;
}

export type { AsciiCell, AsciiGrid, AsciiLayout, AsciiPalette, AsciiTarget, CellSample };
