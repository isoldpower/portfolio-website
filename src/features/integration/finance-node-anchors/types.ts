import type { FinanceInfraAnchor } from "@entities/integration/model";


type AnchorSnapshot = ReadonlyMap<string, FinanceInfraAnchor>;
type AnchorListener = () => void;

export type { AnchorSnapshot, AnchorListener };