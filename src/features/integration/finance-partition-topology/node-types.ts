import type { FinanceNodeType } from "@entities/integration/model";


const STORAGE_TYPES: ReadonlySet<FinanceNodeType> = new Set(["database", "cache", "ledger", "search"]);
const STREAMING_TYPES: ReadonlySet<FinanceNodeType> = new Set(["topic", "connector"]);
const AUXILIARY_TOPIC_SUFFIXES = [".retry", ".dlq"];

export { STORAGE_TYPES, STREAMING_TYPES, AUXILIARY_TOPIC_SUFFIXES };
