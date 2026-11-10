const instanceIdOf = (nodeId: string, groupId: string): string => {
    return `${nodeId}@${groupId}`;
};

export { instanceIdOf };
