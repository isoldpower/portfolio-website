const INSTANCE_SUFFIX_PATTERN = /[@#].*$/;

const baseNodeIdOf = (nodeId: string): string => {
    return nodeId.replace(INSTANCE_SUFFIX_PATTERN, "");
};

export { baseNodeIdOf };
