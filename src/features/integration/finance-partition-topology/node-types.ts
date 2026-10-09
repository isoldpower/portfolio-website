import type { FinanceNodeType } from "@entities/integration/model";


const STORAGE_TYPES: ReadonlySet<FinanceNodeType> = new Set(["database", "cache", "ledger", "search"]);
const STREAMING_TYPES: ReadonlySet<FinanceNodeType> = new Set(["topic"]);
const AUXILIARY_TOPIC_SUFFIXES = [".retry", ".dlq"];
const SHOW_AUXILIARY_TOPICS = false;
const EDGE_GROUP_ID = "edge";
const MAIN_TOPIC_NAME = "events.async";

export {
    STORAGE_TYPES,
    STREAMING_TYPES,
    AUXILIARY_TOPIC_SUFFIXES,
    SHOW_AUXILIARY_TOPICS,
    EDGE_GROUP_ID,
    MAIN_TOPIC_NAME
};
