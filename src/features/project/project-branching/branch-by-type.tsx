import { useMemo, useRef } from "react";
import { ProjectTypeRegistry } from "./project-type-registry.ts";

import type { BranchingSchema } from "./types.ts";
import type { ProjectDetails } from "@entities/project/model";
import type { FC, ReactNode } from "react";


interface BranchProjectByTypeProps {
    schema: BranchingSchema;
    project: ProjectDetails;
    children: ReactNode;
}

const BranchByType: FC<BranchProjectByTypeProps> = ({
    children,
    schema,
    project
}) => {
    const registry = useRef(new ProjectTypeRegistry(schema));
    const HocComponent = useMemo(() => {
        return registry.current.resolve(project);
    }, [registry, project]);

    return (
        <HocComponent>
            {children}
        </HocComponent>
    );
}

export { BranchByType };
