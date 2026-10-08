export { partitionTopology, sectionOf, isStorage } from "./partition-topology.ts";
export { portOf, portPath, sideFacing, sidesBetween } from "./connection-path.ts";
export { routeConnection } from "./route-connection.ts";
export { placeChannels } from "./place-channels.ts";
export { groupTopicChannels } from "./topic-channels.ts";

export type { AnchorLookup, TopicInflowLookup } from "./route-connection.ts";
export type { ChannelPlacementInput } from "./place-channels.ts";
