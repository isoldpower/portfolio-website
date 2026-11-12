type NodeRole = "requests" | "kafka";

const roleIdOf = (nodeId: string, role: NodeRole): string => {
    return `${nodeId}#${role}`;
};

export { roleIdOf };
export type { NodeRole };
