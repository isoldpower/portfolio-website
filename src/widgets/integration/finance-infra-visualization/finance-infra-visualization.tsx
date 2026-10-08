import { useFinanceProjectTopology } from "@features/integration/finance-tracing";
import { Caption, ErrorText } from "@shared/ui-toolkit/typography";

import { FinanceInfraCanvas } from "./ui/finance-infra-canvas.tsx";

import type { FinanceTopology } from "@entities/integration/model";
import type { UseQueryResult } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";


function renderTopology(query: UseQueryResult<FinanceTopology>) {
    if (query.isPending) {
        return <Caption>Loading the infrastructure map…</Caption>;
    }

    if (query.isError) {
        return <ErrorText>Couldn't load the infrastructure map: {query.error.message}</ErrorText>;
    }

    return <FinanceInfraCanvas topology={query.data} />;
}

const FinanceInfraVisualization: FC<PropsWithChildren> = ({
    children,
}) => {
    const topology = useFinanceProjectTopology({ includeTelemetry: false });

    return (
        <div className="flex flex-col gap-4">
            {renderTopology(topology)}
            {children}
        </div>
    );
};


export { FinanceInfraVisualization };
