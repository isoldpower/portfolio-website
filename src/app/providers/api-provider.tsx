import { FinanceProjectApiContext } from "@features/integration/api";
import { ProjectApiContext } from "@features/project/api";

import type { ApiServers } from "./api-servers";
import type { FC, ReactNode } from "react";


interface ApiProviderProps {
    children: ReactNode;
    servers: ApiServers;
}

const ApiProvider: FC<ApiProviderProps> = ({
    children,
    servers
}) => {
    return (
        <ProjectApiContext value={servers.projectApi}>
            <FinanceProjectApiContext value={servers.financeProjectApi}>
                {children}
            </FinanceProjectApiContext>
        </ProjectApiContext>
    );
};

export { ApiProvider };
export type { ApiProviderProps };
