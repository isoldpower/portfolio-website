import type { FinanceInfraAnchor } from "@entities/integrations/model";


type AnchorSnapshot = ReadonlyMap<string, FinanceInfraAnchor>;
type AnchorListener = () => void;

export type { AnchorSnapshot, AnchorListener };