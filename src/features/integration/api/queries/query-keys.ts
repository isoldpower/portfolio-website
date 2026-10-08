const financeTracingKeys = {
    all: [
        "integration",
        "finance-tracing"
    ] as const,
    topology: () => [
        ...financeTracingKeys.all,
        "topology"
    ] as const,
    traceStream: (session: string | null) => [
        ...financeTracingKeys.all,
        "trace-stream",
        session
    ] as const,
};

export { financeTracingKeys };
