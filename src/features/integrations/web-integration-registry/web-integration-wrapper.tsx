import { useIntegrationRegistryContext } from "./context/context.ts";

import type { FC, PropsWithChildren } from "react";


const WebIntegrationWrapper: FC<PropsWithChildren> = ({
    children,
}) => {
    const { RelatedIntegration } = useIntegrationRegistryContext();

    return (
        <RelatedIntegration>
            {children}
        </RelatedIntegration>
    );
}

export { WebIntegrationWrapper };