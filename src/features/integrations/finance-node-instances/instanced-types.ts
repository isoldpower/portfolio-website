import type { FinanceNodeType } from "@entities/integrations/model";


const INSTANCED_TYPES: ReadonlySet<FinanceNodeType> = new Set(["connector", "external"]);

export { INSTANCED_TYPES };
