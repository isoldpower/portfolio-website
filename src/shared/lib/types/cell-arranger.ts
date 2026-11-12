interface CellPlacement {
    x: number;
    y: number;
}

type CellArranger = (x: number, y: number, width: number, height: number, placement: CellPlacement) => void;

export type { CellArranger, CellPlacement };
