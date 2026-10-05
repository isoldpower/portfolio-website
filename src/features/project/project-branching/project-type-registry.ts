import { UnknownProjectTypeError } from "./unknown-project-type-error.ts";

import type { BranchingSchema } from "./types.ts";
import type { ProjectDetails } from "@entities/project/model";
import type { FC, PropsWithChildren } from "react";


type ProjectShellFactory<TProject extends ProjectDetails> = (
    project: TProject
) => FC<PropsWithChildren>;

class ProjectTypeRegistry {
    readonly #schema: BranchingSchema;

    constructor(schema: BranchingSchema) {
        this.#schema = schema;
    }

    resolve<TProject extends ProjectDetails>(project: TProject): FC<PropsWithChildren> {
        const factory = this.#schema[project.kind] as ProjectShellFactory<TProject> | undefined;

        if (factory === undefined) {
            throw new UnknownProjectTypeError(project.kind);
        }

        return factory(project);
    }
}

export { ProjectTypeRegistry };
