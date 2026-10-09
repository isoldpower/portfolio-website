import type { FinanceNodeType } from "@entities/integration/model";


const INSTANCED_TYPES: ReadonlySet<FinanceNodeType> = new Set(["connector", "external"]);

export { INSTANCED_TYPES };
